import "./style.css";

import { TasksState } from "./modules/tasks/TasksState";
import { TasksListComponent } from "./modules/tasks/ui/TasksList/TasksList";
import { NewTaskComponent } from "./modules/tasks/ui/NewTask/NewTask";

const app = document.querySelector<HTMLDivElement>("#app")!;

const instanceTasks = await TasksState.init();
instanceTasks.subscribe(new TasksListComponent(app));

new NewTaskComponent(app);
