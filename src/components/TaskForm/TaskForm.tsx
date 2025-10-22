import { Status, Priority } from "../../constants";
import type { TNewTask } from "../../types";

import "./taskForm.css";

type TaskFormProps = {
  onSubmit: (data: TNewTask) => void;
};

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const deadline = formData.get("deadline") as string;
    const priority = formData.get("priority") as Priority;
    const status = formData.get("status") as Status;

    onSubmit({
      title,
      description,
      priority,
      deadline: new Date(deadline),
      createdAt: new Date(),
      status: status || Status.Todo,
    });

    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <input type="text" id="title" name="title" placeholder="Завдання" required />
      <input type="date" id="deadline" name="deadline" required />
      <select name="status">
        <option value={Status.Todo}>Todo</option>
        <option value={Status.InProgress}>In Progress</option>
        <option value={Status.Done}>Done</option>
      </select>
      <select name="priority">
        <option value={Priority.Low}>Low</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.High}>High</option>
      </select>
      <textarea
        rows={3}
        className="description"
        id="description"
        name="description"
        placeholder="Опис"
      ></textarea>
      <button type="submit">Save</button>
    </form>
  );
};
