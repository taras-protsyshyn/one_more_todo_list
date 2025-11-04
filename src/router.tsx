import { createBrowserRouter } from "react-router-dom";
import { TasksList, NewTaskForm, EditTask } from "./features/tasks/pages";

export const routs = {
  HOME: "/",
  NEW_TASK: "new-task",
  TASK: "task",
  TASK_ID: "task/:taskId",
  taskPath: (id: string) => `${routs.TASK}/${id}`,
};

export const router = createBrowserRouter([
  {
    path: routs.HOME,
    element: <TasksList />,
    children: [
      { path: routs.NEW_TASK, element: <NewTaskForm /> },
      { path: routs.TASK_ID, element: <EditTask /> },
    ],
  },
]);
