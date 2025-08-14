import type { TaskModel } from "../types/task.model";
import API from "./api";

export default new API<TaskModel>("/todo-lists");
