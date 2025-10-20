import { fetchData } from "../../api/api";

import { taskSchema } from "./tasks.schemas";
import type { TNewTask, TTask } from "./tasks.types";

export const getTasks = async () => {
  const data = await fetchData("/tasks");

  return taskSchema.array().parse(data);
};

export const getTaskById = async (id: string) => {
  const data = await fetchData(`/tasks/${id}`);

  return taskSchema.parse(data);
};

export const createTask = async (task: TNewTask) => {
  const data = await fetchData<TNewTask>("/tasks", "POST", task);

  return taskSchema.parse(data);
};

export const updateTask = async (task: TTask) => {
  const data = await fetchData<TTask>(`/tasks/${task.id}`, "PATCH", task);

  return taskSchema.parse(data);
};

export const deleteTask = async (id: string) => {
  await fetchData<TTask>(`/tasks${id}`, "DELETE");
  return id;
};
