import { Priority, Status } from "../../task.constants";

import { TasksState } from "../../TasksState";
import { TaskForm } from "../TaskForm/TaskForm";
import { Modal } from "../../../../shared/Modal/Modal";
import { UIComponent } from "../../../../shared/UIComponent/UIComponent";

export class NewTaskComponent extends UIComponent {
  state: TasksState;
  form: HTMLElement;
  modal: Modal;
  openModalBtn: HTMLElement;
  container: HTMLElement;

  constructor(container: HTMLElement) {
    super();

    this.container = container;
    this.state = TasksState.getInstance();
    this.modal = Modal.init("Нове завдання");

    this.form = new TaskForm().node;
    this.form.addEventListener("submit", (e) => this.addTask(e));

    this.openModalBtn = this.parseTemplate(`
        <button class="add_task"  type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>`);

    this.openModalBtn.addEventListener("click", () => {
      this.modal.open(this.form);
    });

    this.container.appendChild(this.openModalBtn);
  }

  async addTask(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const deadline = formData.get("deadline") as string;
    const priority = formData.get("priority") as Priority;
    const status = formData.get("status") as Status;

    await this.state.addTask({
      title,
      description,
      priority,
      deadline: new Date(deadline),
      createdAt: new Date(),
      status: status || Status.Todo,
    });

    form.reset();
    this.modal.close();
  }
}
