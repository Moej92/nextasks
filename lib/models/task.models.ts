import mongoose, { Document, Schema } from 'mongoose';

// Define the Task interface
export interface ITask extends Document {
  title: string;
  note?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  parentTask: mongoose.Types.ObjectId; // For subtasks
  subtasks?: mongoose.Types.ObjectId[]; // Array of subtasks
  createdBy: mongoose.Types.ObjectId;
  subtaskCount?: number;
  tags?: string[];
}

// Define the Task schema
const TaskSchema: Schema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    tags: { type: String },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    parentTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: null
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
},
);

TaskSchema.virtual('subtaskCount').get(function (this: ITask) {
    return this.subtasks ? this.subtasks.length : 0;
});

TaskSchema.set('toJSON', { virtuals: true });
TaskSchema.set('toObject', { virtuals: true });

// Export the model
const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
export default Task;
