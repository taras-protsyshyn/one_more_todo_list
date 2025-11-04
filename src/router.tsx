import { createBrowserRouter } from "react-router-dom";
import { TasksList } from "./features/tasks/pages/TasksList/TasksList";

export const router = createBrowserRouter([{ path: "/", element: <TasksList /> }]);
