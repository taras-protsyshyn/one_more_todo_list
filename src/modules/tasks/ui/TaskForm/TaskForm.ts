import { Priority, Status } from "../../task.constants";

import { UIComponent } from "../../../../shared/UIComponent/UIComponent";

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
        <button type="submit">Нове</button>
      </form>
    `);
  }
}
