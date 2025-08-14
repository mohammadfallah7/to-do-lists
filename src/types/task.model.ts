export type TaskModel = {
  id: number;
  task: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskPayload = {
  task: string;
};

export type UpdateTaskPayload = {
  task?: string;
  isDone?: boolean;
};
