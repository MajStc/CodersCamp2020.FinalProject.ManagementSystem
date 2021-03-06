import mongoose from "mongoose";
import { Task } from "../interfaces/task.interface";
import ROLES from "../enums/projectRoles";
import TaskSTATUS from '../enums/taskStatus';

const memberSchema = new mongoose.Schema({
  _id: false,
      name: {
        type: String,
        minlength: 3,
        maxlength: 24,
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      role: {
        type: ROLES,
        required: true,
      },
})

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 24,
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  deadlineDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    default: TaskSTATUS.NEW,
  },
  commentsId: {
    type: [String],
    required: true,
    default: [],
  },
  members: [
    memberSchema
  ],
});

const taskModel = mongoose.model<Task & mongoose.Document>("Task", taskSchema);
export default taskModel;
