import type { TTask, TTaskFormValues, TTasksState } from "../../tasks.types";
import { UIComponent } from "../../../../shared/UIComponent/UIComponent";
import { formatDate } from "../../../../utils/formatDate";
import { Modal } from "../../../../shared/Modal/Modal";
import { TaskForm } from "../TaskForm/TaskForm";
import { TasksState } from "../../TasksState";

export class TasksListComponent extends UIComponent {
  container: HTMLElement = null!;
  list: HTMLElement = null!;
  modal: Modal;
  form: TaskForm;
  state: TasksState;
  editedTaskId: string | null = null;

  constructor(container: HTMLElement) {
    super();

    this.container = container.appendChild(
      this.parseTemplate(`
      <div class="container">
        <h1>Список завдань</h1>
        <ul class="tasks_list"></ul>
      </div>
    `)
    );

    this.state = TasksState.getInstance();
    this.modal = Modal.init("Редагувати завдання");
    this.form = new TaskForm();

    this.form.onSubmit((data) => this.editTask(data));
    this.list = this.container.querySelector("ul") as HTMLElement;
  }

  listItem(task: TTask): HTMLElement {
    return this.parseTemplate(`
    <li class="tasks_list--item">
    <div class="tasks_list--item-info">
      <span>${task.title}</span>
      <div class="tasks_list--sub-info">
        <span>Status: ${task.status}</span>
        <span>Priority: ${task.priority}</span>
        <span>Deadline: ${formatDate(task.deadline)}</span>
      </div>
      </div>
      <button class="list-item-btn list-item-btn--delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </button>
    </li>
  `);
  }

  async editTask(data: TTaskFormValues) {
    if (this.editedTaskId) {
      await this.state.updateTask({
        id: this.editedTaskId,
        ...data,
      });
      this.editedTaskId = null;
    }

    this.modal.close();
  }

  render({ tasks }: TTasksState) {
    this.list.innerHTML = "";

    this.list.append(
      ...tasks.map((task) => {
        const listItem = this.listItem(task);
        const deleteBtn = listItem.querySelector(".list-item-btn--delete") as HTMLElement;

        deleteBtn.addEventListener("click", async (e) => {
          e.stopPropagation();
          await this.state.deleteTask(task.id);
        });

        listItem.addEventListener("click", () => {
          this.modal.open(this.form.node);
          this.editedTaskId = task.id;

          this.form.setValues({
            title: task.title,
            description: task.description,
            deadline: task.deadline.toISOString().split("T")[0],
            priority: task.priority,
            status: task.status,
          });
        });

        return listItem;
      })
    );
  }
}
