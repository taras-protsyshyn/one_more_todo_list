import { useNavigate } from "react-router-dom";

import { Modal } from "../../../../shared/components";
import { TaskForm } from "../../components";
import { useTaskForm, useAddTask } from "../../hooks";

export const NewTaskForm = () => {
  const navigate = useNavigate();

  const closeModal = () => navigate(-1);

  const [addTask, { loading }] = useAddTask({
    onSuccess: closeModal,
  });

  const { register, handleSubmit, errors } = useTaskForm();

  const onSubmit = handleSubmit((data) => addTask(data));

  return (
    <>
      <Modal isOpen={true} onClose={closeModal} title="Create New Task">
        <TaskForm onSubmit={onSubmit} submitting={loading} register={register} errors={errors} />
      </Modal>
    </>
  );
};
