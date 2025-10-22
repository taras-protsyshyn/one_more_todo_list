import { TasksState } from "../../TasksState";
import { TaskForm } from "../TaskForm/TaskForm";
import { Modal } from "../../../../shared/Modal/Modal";
import { UIComponent } from "../../../../shared/UIComponent/UIComponent";
import type { TNewTask } from "../../tasks.types";

export class NewTaskComponent extends UIComponent {
  state: TasksState;
  form: TaskForm;
  modal: Modal;
  openModalBtn: HTMLElement;
  container: HTMLElement;

  constructor(container: HTMLElement) {
    super();

    this.container = container;
    this.state = TasksState.getInstance();
    this.modal = Modal.init("Нове завдання");

    this.form = new TaskForm();
    this.form.onSubmit((data) => this.addTask({ ...data, createdAt: new Date() }));

    this.openModalBtn = this.parseTemplate(`
        <button class="add_task"  type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>`);

    this.openModalBtn.addEventListener("click", () => {
      this.modal.open(this.form.node);
    });

    this.container.appendChild(this.openModalBtn);
  }

  async addTask(newTask: TNewTask) {
    await this.state.addTask(newTask);

    this.modal.close();
  }
}
