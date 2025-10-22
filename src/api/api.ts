import { taskSchema } from "../schemas";
import type { TEditTask, TNewTask, TTask } from "../types";

const API_BASE_URL = "http://localhost:3001";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

const fetchData = async <T>(url: string, method: Method = "GET", body?: T) => {
  const fullUrl = `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...{ body: body && JSON.stringify(body) },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getTasks = async () => {
  const data = await fetchData("/tasks");

  return taskSchema.array().parse(data);
};

export const getTaskById = async (id: string) => {
  const data = await fetchData(`/tasks/${id}`);

  return taskSchema.parse(data);
};

export const addTask = async (task: TNewTask) => {
  const data = await fetchData<TNewTask>("/tasks", "POST", { ...task, createdAt: new Date() });

  return taskSchema.parse(data);
};

export const updateTask = async (task: TEditTask) => {
  const data = await fetchData<TEditTask>(`/tasks/${task.id}`, "PATCH", task);

  return taskSchema.parse(data);
};

export const deleteTask = async (id: string) => {
  await fetchData<TTask>(`/tasks/${id}`, "DELETE");
  return id;
};
