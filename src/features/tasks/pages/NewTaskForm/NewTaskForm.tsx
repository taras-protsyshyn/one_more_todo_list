import { useNavigate } from "react-router-dom";

import { useCallApi } from "../../../../shared/hooks/useCallApi";
import { addTask } from "../../api";
import { Modal } from "../../../../shared/components";
import { TaskForm } from "../../components";
import type { TTask, TTaskFormValues } from "../../types";

export const NewTaskForm = () => {
  const navigate = useNavigate();
  const [callAddTask] = useCallApi<TTask, TTaskFormValues>((data) => addTask(data!));

  const onSubmit = (data: TTaskFormValues) => {
    callAddTask(data);
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} title="Create New Task">
        <TaskForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
};
