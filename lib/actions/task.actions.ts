"use server";

export const runtime = "nodejs";

import connectToDB from "../mongoose";
import Task from "../models/task.models";

import { ITaskFormData } from "../types";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongoose";

interface Subtask {
  title: string;
  note?: string;
  dueDate?: string;
  _id?: ObjectId;
}

export const createNewTask = async (taskData: ITaskFormData, userId?: string) => {
    const { title, note, tags, dueDate, priority, subtasks} = taskData;

    try {
        await connectToDB();

        const mainTask = new Task({
            title, 
            note, 
            tags, 
            dueDate, 
            priority, 
            createdBy: userId,
            subtasks: []
        })

        const savedMainTask = await mainTask.save();

        if(subtasks.length > 0) {
            const savedSubtasks = await Promise.all(
                subtasks.map(async (subtask: Subtask) => {
                    const newSubtask = new Task({
                        title: subtask.title,
                        note: subtask.note,
                        dueDate: subtask.dueDate,
                        parentTask: savedMainTask._id,
                        createdBy: userId
                    });
    
                    const savedSubtasks = await newSubtask.save();
                    return savedSubtasks._id
                })
            );
    
            savedMainTask.subtasks = savedSubtasks;
            await savedMainTask.save();
        }

        return { message: "Successfully created" }
    } catch(err: any) {
        throw new Error(`Failed to add task. Please try again. ${err.message}`)
    }
}

export const editTask = async (taskData: ITaskFormData, taskId?: string) => {
  const { title, note, tags, dueDate, priority, subtasks } = taskData;

  try {
    await connectToDB();
    
    const taskDoc = await Task.findById(taskId);
    if(!taskDoc) {
      throw new Error("Task not found.");
    }

    // Update the main task details
    taskDoc.title = title;
    taskDoc.note = note;
    taskDoc.tags = tags;
    taskDoc.dueDate = dueDate;
    taskDoc.priority = priority;

    // Array to track updated or newly created subtask IDs
    const updatedSubtaskIds: string[] = [];

    if(subtasks.length > 0) {
      await Promise.all(
        subtasks.map(async (subtask: Subtask) => {
          if(subtask._id) {
            // Update exisiting subtask
            const exisitingSubtask = await Task.findById(subtask._id);
            if(exisitingSubtask) {
              exisitingSubtask.title = subtask.title;
              exisitingSubtask.note = subtask.note;
              exisitingSubtask.dueDate = subtask.dueDate;
              await exisitingSubtask.save();
              updatedSubtaskIds.push(exisitingSubtask._id.toString());
            }
          } else {
            // Create a new subtask
            const newSubtask = new Task({
              title: subtask.title,
              note: subtask.note,
              dueDate: subtask.dueDate,
              parentTask: taskId
            })
            const savedSubtask = await newSubtask.save();
            updatedSubtaskIds.push(savedSubtask._id.toString());
          }
        })
      )
    }

    // Remove subtasks that are no longer present in the updated data
    const subtasksToRemove = taskDoc.subtasks.filter(
      (subtaskId: string) => !updatedSubtaskIds.includes(subtaskId.toString())
    );

    await Promise.all(
      subtasksToRemove.map(async (subtaskId: string) => {
          await Task.findByIdAndDelete(subtaskId);
      })
    );

    // Update the task's subtasks array
    taskDoc.subtasks = updatedSubtaskIds;

    await taskDoc.save();

    revalidatePath("/");

    return { message: "successfully updated" };

  } catch(error: any) {
    throw new Error(`Failed to edit task. ${error.message}`)
  }
}

export const getTasksForHomePage = async (userId: string) => {
    try {
        await connectToDB();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day
        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999); // End of the day
    
        // Fetch tasks based on categories directly in the query
        const [todayTasks, upcomingTasks, overdueTasks] = await Promise.all([
          Task.find({
            createdBy: userId,
            parentTask: null, // Only main tasks
            dueDate: { $gte: today, $lte: endOfToday }, // Today's tasks
          })
            .select("title note tags dueDate priority isCompleted subtasks")
            .populate("subtasks", "isCompleted title note dueDate")
            , // Fetch subtask count

          Task.find({
            createdBy: userId,
            parentTask: null,
            isCompleted: false, // Exclude completed tasks
            dueDate: { $gt: endOfToday }, // Upcoming tasks
          })
            .sort({ dueDate: 1 })
            .select("title note tags dueDate priority isCompleted subtasks")
            .populate("subtasks", "isCompleted title note dueDate")
            ,

          Task.find({
            createdBy: userId,
            parentTask: null,
            isCompleted: false, // Exclude completed tasks
            dueDate: { $lt: today }, // Overdue tasks
          })
            .select("title note tags dueDate priority isCompleted subtasks")
            .populate("subtasks", "isCompleted title note dueDate")
            ,
        ]);
    
        return { today: todayTasks, upcoming: upcomingTasks, overdue: overdueTasks };
    } catch(err: any) {
        throw new Error(`Failed to fetch tasks. ${err.message}`)
    }
}

export const deleteTask = async (taskId: string) => {
  try {
    await connectToDB();

    await Task.deleteMany({ parentTask: taskId})
    await Task.findByIdAndDelete(taskId);

    revalidatePath("/");

    return {
      message: "Successfully Deleted"
    }

  } catch(error: any) {
    throw new Error(`Failed to delete the task ${error.message}`)
  } 
}

export const updateTaskCompletionStatus = async (taskId: string, isCompleted: boolean) => {
  const session = await Task.startSession();

  try {
    session.startTransaction();

    await connectToDB();

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { isCompleted },
      { new: true }
    );

    if(!updatedTask) {
      throw new Error("Task not found");
    }

    if(isCompleted) {
      await Task.updateMany(
        { parentTask: { $eq: taskId, $exists: true } },
        { isCompleted: true },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    revalidatePath("/");

    return {
      message: isCompleted
        ? "Task marked as completed"
        : "Task reopened"
    }

  } catch(error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Failed to update task status: ${error.message}`)
  }
}

export const updateSubtaskCompletionStatus = async (taskId: string, isCompleted: boolean) => {
  try {
    await connectToDB();

    await Task.findByIdAndUpdate(taskId, { isCompleted });

    revalidatePath("/my-tasks");

    return { message: "Successfully updated" };

  } catch(error: any) {
    throw new Error(`Failed to update subtask status. ${error.message}`);
  }
}

export const getTaskById = async (taskId: string, userId: string) => {

  try {
    const taskDoc = await Task
      .findOne({ _id: taskId, createdBy: userId })
      .populate('subtasks', "title note dueDate isCompleted createdAt");

    if(!taskDoc) {
      return { error: "Unauthorized access" };
    }
    
    return taskDoc;
  } catch(error: any) {
    throw new Error(`Failed to get Task: ${error.message}`);
  }
}

export const searchTasks = async (userId: string, searchTerm: string) => {
  try {
    await connectToDB();

    const query = {
      createdBy: userId,
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } }
      ]
    };

    const tasks = await Task.find(query).select("title dueDate isCompleted").lean();
    return JSON.parse(JSON.stringify(tasks));
  } catch(error: any) {
    throw new Error(error.message)
  }
}