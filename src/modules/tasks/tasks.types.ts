import { z } from "zod";

import { Status, Priority } from "./task.constants.js";
import { taskSchema } from "./tasks.schemas";

export type Filters = { status?: Status; priority?: Priority; createdAt?: Date };

export type TTask = z.infer<typeof taskSchema>;

export type TNewTask = Omit<TTask, "id">;

export type TTasksState = {
  tasks: TTask[];
};

export abstract class TasksComponent {
  abstract render(data: TTasksState): void;
}
