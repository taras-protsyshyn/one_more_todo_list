import { useNavigate } from "react-router-dom";

import { useCallApi } from "../../../../shared/hooks/useCallApi";
import { addTask } from "../../api";
import { Modal } from "../../../../shared/components";
import { TaskForm } from "../../components";
import { useTaskForm } from "../../hooks";
import type { TTask, TTaskFormValues } from "../../types";

export const NewTaskForm = () => {
  const navigate = useNavigate();
  const [callAddTask] = useCallApi<TTask, TTaskFormValues>((data) => addTask(data!));
  const { register, handleSubmit, errors } = useTaskForm();
  const onSubmit = handleSubmit((data) => callAddTask(data));

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} title="Create New Task">
        <TaskForm onSubmit={onSubmit} register={register} errors={errors} />
      </Modal>
    </>
  );
};
