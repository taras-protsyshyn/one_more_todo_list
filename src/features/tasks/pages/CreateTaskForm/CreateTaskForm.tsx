import { useState } from "react";

import { useCallApi } from "../../../../shared/hooks/useCallApi";
import { addTask } from "../../api";
import { Modal } from "../../../../shared/components";
import { TaskForm } from "../../components";
import type { TTask, TTaskFormValues } from "../../types";
import "./createTaskForm.css";

export const CreateTaskForm = () => {
  const [isOpen, setOpen] = useState(false);
  const [callAddTask] = useCallApi<TTask, TTaskFormValues>(addTask);

  const onSubmit = (data: TTaskFormValues) => {
    callAddTask(data);
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="addTask" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} title="Create New Task">
        <TaskForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
};
