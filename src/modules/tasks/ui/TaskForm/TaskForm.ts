import { Priority, Status } from "../../task.constants";

import { UIComponent } from "../../../../shared/UIComponent/UIComponent";
import type { TTaskFormValues } from "../../tasks.types";

export class TaskForm extends UIComponent {
  node: HTMLElement = null!;

  constructor() {
    super();
    this.node = this.parseTemplate(`
      <form class="task-form">
        <input type="text" id="title" name="title" placeholder="Завдання" required />
        <input type="date" id="deadline" name="deadline" required />
        <select name="status">
        <option value="${Status.Todo}">Todo</option>
        <option value="${Status.InProgress}">In Progress</option>
        <option value="${Status.Done}">Done</option>
        </select>
        <select name="priority">
        <option value="${Priority.Low}">Низький</option>
        <option value="${Priority.Medium}">Середній</option>
        <option value="${Priority.High}">Високий</option>
        </select>
        <textarea  rows="3" type="text" class="description" id="description" name="description" placeholder="Опис" ></textarea>
        <button type="submit">Save</button>
      </form>
    `);
  }

  setValues(
    values: Partial<{
      title: string;
      description: string;
      deadline: string;
      priority: Priority;
      status: Status;
    }>
  ) {
    (this.node.querySelector("#title") as HTMLInputElement).value = values.title || "";
    (this.node.querySelector("#description") as HTMLTextAreaElement).value =
      values.description || "";
    (this.node.querySelector("#deadline") as HTMLInputElement).value = values.deadline || "";
    (this.node.querySelector("select[name='priority']") as HTMLSelectElement).value =
      values.priority || Priority.Low;
    (this.node.querySelector("select[name='status']") as HTMLSelectElement).value =
      values.status || Status.Todo;
  }

  onSubmit(cb: (formData: TTaskFormValues) => void) {
    this.node.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const deadline = formData.get("deadline") as string;
      const priority = formData.get("priority") as Priority;
      const status = formData.get("status") as Status;

      cb({
        title,
        description,
        priority,
        deadline: new Date(deadline),
        status: status || Status.Todo,
      });

      form.reset();
    });
  }
}
