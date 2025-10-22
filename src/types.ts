import { z } from "zod";

import { Status, Priority } from "./constants.js";
import { taskFormSchema, taskSchema } from "./schemas";

export type Filters = { status?: Status; priority?: Priority; createdAt?: Date };

export type TTask = z.infer<typeof taskSchema>;

export type TNewTask = Omit<TTask, "id">;
export type TEditTask = Omit<TTask, "createdAt">;
export type TTaskFormValues = z.infer<typeof taskFormSchema>;
export type TTasksState = {
  tasks: TTask[];
};

export abstract class TasksComponent {
  abstract render(data: TTasksState): void;
}
