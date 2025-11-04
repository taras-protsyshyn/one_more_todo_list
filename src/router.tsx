import { createBrowserRouter } from "react-router-dom";
import { TasksList, NewTaskForm } from "./features/tasks/pages";

export const routs = {
  HOME: "/",
  NEW_TASK: "new-task",
};

export const router = createBrowserRouter([
  {
    path: routs.HOME,
    element: <TasksList />,
    children: [{ path: routs.NEW_TASK, element: <NewTaskForm /> }],
  },
]);
