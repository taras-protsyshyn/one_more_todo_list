import type { TNewTask, TTask, TTasksState, TasksComponent } from "./tasks.types";

import { getTasks, addTask } from "./tasks.api";

export class TasksState {
  private static instance: TasksState;
  data: TTasksState = { tasks: [] };

  subscribers: Array<TasksComponent> = [];

  private constructor() {}

  public static async init(): Promise<TasksState> {
    if (!TasksState.instance) {
      TasksState.instance = new TasksState();
      const tasks = await getTasks();
      TasksState.instance.data = { tasks };
    }
    return TasksState.instance;
  }

  public static getInstance(): TasksState {
    if (!TasksState.instance) {
      throw new Error("TasksState is not initialized. Call init() first.");
    }
    return TasksState.instance;
  }

  subscribe(observer: TasksComponent) {
    this.subscribers.push(observer);
    observer.render(this.data);
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber.render(this.data));
  }

  updateTasks(tasks: TTask[]) {
    this.data.tasks = tasks;
    this.notify();
  }

  async addTask(task: TNewTask) {
    const newTask = await addTask(task);
    this.data.tasks.push(newTask);
    this.notify();
  }
}
