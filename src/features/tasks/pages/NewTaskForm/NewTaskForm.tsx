import { useNavigate } from "react-router-dom";

import { useCallApi } from "../../../../shared/hooks/useCallApi";
import { addTask } from "../../api";
import { Modal } from "../../../../shared/components";
import { TaskForm } from "../../components";
import { useTaskForm } from "../../hooks";
import type { TTask, TTaskFormValues } from "../../types";

export const NewTaskForm = () => {
  const navigate = useNavigate();
  const [callAddTask, { loading: submitting }] = useCallApi<TTask, TTaskFormValues>((data) =>
    addTask(data!)
  );
  const { register, handleSubmit, errors } = useTaskForm();

  const onClose = () => {
    navigate(-1);
  };

  const onSubmit = handleSubmit(async (data) => {
    await callAddTask(data);
    onClose();
  });

  return (
    <>
      <Modal isOpen={true} onClose={onClose} title="Create New Task">
        <TaskForm onSubmit={onSubmit} submitting={submitting} register={register} errors={errors} />
      </Modal>
    </>
  );
};
