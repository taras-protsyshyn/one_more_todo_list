import { createContext, useContext, useReducer, type ActionDispatch } from "react";

import { TaskReducerType } from "./constants";
import type { TTask } from "./types";

type TAction =
  | { type: TaskReducerType.DeleteTask; id: string }
  | { type: TaskReducerType.AddTask | TaskReducerType.UpdateTask; task: TTask }
  | { type: TaskReducerType.SetTasks; tasks: TTask[] };

function tasksReducer(tasks: Array<TTask>, action: TAction) {
  switch (action.type) {
    case TaskReducerType.AddTask: {
      return [...tasks, action.task];
    }
    case TaskReducerType.UpdateTask: {
      return tasks.map((task) => (task.id === action.task.id ? action.task : task));
    }
    case TaskReducerType.DeleteTask: {
      return tasks.filter((task) => task.id !== action.id);
    }
    case TaskReducerType.SetTasks: {
      return action.tasks;
    }
    default: {
      throw Error("Unknown action: " + (action as { type: string }).type);
    }
  }
}

const TasksContext = createContext<TTask[]>([]);
const TasksDispatchContext = createContext<ActionDispatch<[action: TAction]>>(() => {});

export const useTasks = () => useContext(TasksContext);
export const useTasksDispatch = () => useContext(TasksDispatchContext);

type TasksProviderProps = {
  children: React.ReactNode;
};

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};
