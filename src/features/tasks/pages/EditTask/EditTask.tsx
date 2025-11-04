import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Modal } from "../../../../shared/components";
import { TaskForm } from "../../components";
import { useTaskForm, useTaskDetails, useEditTask } from "../../hooks";

import type { TTaskFormValues } from "../../types";

export const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { register, handleSubmit, errors, setValue } = useTaskForm();

  const closeModal = () => navigate(-1);

  const [editTask, { loading: submitting }] = useEditTask({
    onSuccess: closeModal,
  });

  const { task, loading } = useTaskDetails(taskId);

  const onSubmit = handleSubmit(async (data: TTaskFormValues) =>
    editTask({ id: taskId!, ...data })
  );

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("status", task.status);
      setValue("priority", task.priority);
      // @ts-expect-error: Дата очікується у форматі рядка YYYY-MM-DD
      setValue("deadline", task.deadline.toISOString().split("T")[0]);
    }
  }, [task, setValue]);

  return (
    <>
      <Modal isOpen={true} onClose={closeModal} title="Edit Task">
        <TaskForm
          loading={loading}
          submitting={submitting}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
      </Modal>
    </>
  );
};
