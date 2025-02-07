"use server";

import { prisma } from "@/prisma/prisma";
import { ITaskFormData } from "../types";
import { revalidatePath } from "next/cache";


export const createNewTask = async (taskData: ITaskFormData, userId?: string) => {
  const { title, note, tags, dueDate, priority, subtasks } = taskData;

  if(title.trim() === "") {
    return { message: "Title is empty"}
  }

  if(!userId) return;
  try {
    await prisma.task.create({
      data: {
        title,
        note,
        tags,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: !priority ? "" : priority,
        createdById: userId,
        subtasks: {
          create: subtasks.map((subtask) => ({
            title: subtask.title,
            note: subtask.note,
            dueDate: subtask.dueDate ? new Date(subtask.dueDate) : null
          }))
        }
      }
    })

    return { message: "Successfully created" };
  } catch (err: any) {
    throw new Error(`Failed to add task. Please try again. ${err.message}`);
  }
}

export const editTask = async (taskData: ITaskFormData, taskId?: string) => {

  try {
    const { title, note, dueDate, priority, tags, subtasks } = taskData;

    // Get current subtasks from the database
    const existingSubtasks = await prisma.subtask.findMany({
      where: { parentTaskId: taskId },
      select: { id: true, title: true, note: true, dueDate: true }
    });

    const existingSubtaskIds = existingSubtasks.map((sub) => sub.id);
    // console.log(existingSubtaskIds);

    // Ignore new subtasks
    const updatedSubtaskIds = subtasks.map((sub: any) => sub.id).filter(Boolean);

    // Find subtasks to delete (existing ones not in the updated list)
    const subtasksToDelete = existingSubtaskIds.filter(
      (id) => !updatedSubtaskIds.includes(id)
    );

    // Prepare updates, deletions, and insertions
    const updateTask = prisma.task.update({
      where: { id: taskId },
      data: { 
        title, 
        note, 
        dueDate: dueDate ? new Date(dueDate) : null, 
        priority, 
        tags 
      },
    });

    const updateSubtasks = subtasks
      .filter((sub: any) => sub.id) // Update only if it has an ID
      .map((sub: any) =>
        prisma.subtask.update({
          where: { id: sub.id },
          data: { 
            title: sub.title, 
            note: sub.note, 
            dueDate: sub.dueDate ? new Date(sub.dueDate) : null 
          },
        })
      );

    const createSubtasks = subtasks
    .filter((sub: any) => !sub.id) // Create only if it has no ID
    .map((sub) =>
      prisma.subtask.create({
        data: { ...sub, parentTaskId: taskId },
      })
    );

    const deleteSubtasks = prisma.subtask.deleteMany({
      where: { id: { in: subtasksToDelete } },
    });


    await prisma.$transaction([
      updateTask,
      ...updateSubtasks,
      ...createSubtasks,
      deleteSubtasks,
    ]);

    revalidatePath("/");

    return { message: "successfully updated" };

  } catch(error: any) {
    throw new Error(`Failed to edit task. ${error.message}`)
  }
}

export const getTasksForHomePage = async (userId: string) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999); // End of the day

    const [todayTasks, upcomingTasks, overdueTasks] = await Promise.all([
      prisma.task.findMany({
        where: {
          createdById: userId,
          dueDate: {
            gte: today,
            lte: endOfToday
          }
        },
        include: {
          subtasks: true
        }
      }),
      prisma.task.findMany({
        where: {
          createdById: userId,
          dueDate: {
            gt: endOfToday
          }
        },
        include: {
          subtasks: true
        }
      }),
      prisma.task.findMany({
        where: {
          createdById: userId,
          dueDate: {
            not: null,
            lt: today,
          },
          isCompleted: false
        },
        include: {
          subtasks: true
        }
      })
    ]);

    return { today: todayTasks, upcoming: upcomingTasks, overdue: overdueTasks };

  } catch (error: any) {
    throw new Error(`Failed to fetch tasks. ${error.message}`);
  }
}

export const deleteTask = async (taskId: string) => {
  try {

    const deleteSubtasks = prisma.subtask.deleteMany({
      where: {
        parentTaskId: taskId, // Delete all subtasks linked to the main task
      },
    });

    const deleteTask = prisma.task.delete({
      where: { id: taskId }, // Delete the main task
    });

    await prisma.$transaction([deleteSubtasks, deleteTask]);

    revalidatePath("/");

    return {
      message: "Successfully Deleted"
    }

  } catch(error: any) {
    return { error: "An error occured" }
  } 
}

export const updateTaskCompletionStatus = async (taskId: string, isCompleted: boolean) => {
  try {
    let updateSubtasks = [];
    
    if(isCompleted) {
      updateSubtasks.push(
        prisma.subtask.updateMany({
          where: { parentTaskId: taskId },
          data: { isCompleted: true }
        })
      );
    }

    const updateTask = prisma.task.update({
      where: { id: taskId },
      data: { isCompleted }
    })

    await prisma.$transaction([...updateSubtasks, updateTask]);

    revalidatePath("/");

    return {
      message: isCompleted
        ? "Task marked as completed"
        : "Task reopened"
    }

  } catch(error: any) {
    throw new Error(`Failed to update task status: ${error.message}`)
  }
}

export const updateSubtaskCompletionStatus = async (taskId: string, isCompleted: boolean) => {
  try {

    await prisma.subtask.update({
      where: { id: taskId },
      data: { isCompleted }
    });

    revalidatePath("/my-tasks");

    return { message: "Successfully updated" };

  } catch(error: any) {
    throw new Error(`Failed to update subtask status. ${error.message}`);
  }
}

export const getTaskById = async (taskId: string, userId: string) => {

  try {
    const task = await prisma.task.findFirst({
      where: {
        createdById: userId,
        id: taskId
      },
      include: {
        subtasks: true
      }
    })

    if(!task) throw new Error("Unauthorized access");
    
    return task;
  } catch(error: any) {
    throw new Error(`Failed to get Task: ${error.message}`);
  }
}

export const searchTasks = async (userId: string, searchTerm: string) => {
  try {

    const tasks = await prisma.task.findMany({
      where: {
        createdById: userId,
        OR: [
          { title: { contains: searchTerm, mode: "insensitive"} },
          { tags: { contains: searchTerm, mode: "insensitive" } }
        ]
      },
      select: {
        id: true,
        title: true,
        dueDate: true,
        isCompleted: true
      }
    })

    return JSON.parse(JSON.stringify(tasks));
  } catch(error: any) {
    throw new Error(error.message)
  }
}