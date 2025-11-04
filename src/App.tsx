import { RouterProvider } from "react-router-dom";

import { TasksProvider } from "./features/tasks/context";
import { router } from "./router";

function App() {
  return (
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  );
}

export default App;
