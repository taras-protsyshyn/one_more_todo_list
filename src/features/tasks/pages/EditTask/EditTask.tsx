import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCallApi } from "../../../../shared/hooks/useCallApi";
import { updateTask, getTaskById } from "../../api";
import { Modal } from "../../../../shared/components";
import { TaskForm } from "../../components";
import { useTaskForm } from "../../hooks";
import type { TEditTask, TTask, TTaskFormValues } from "../../types";

export const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { register, handleSubmit, errors, setValue } = useTaskForm();

  const [callAddTask] = useCallApi<TEditTask, TTaskFormValues>((data) =>
    updateTask({ id: taskId!, ...data! })
  );

  const getTaskByIdFetcher = useCallback(() => getTaskById(taskId!), [taskId]);

  const [callGetTaskById, { data: task }] = useCallApi<TTask>(getTaskByIdFetcher);

  const onClose = () => {
    navigate(-1);
  };

  const onSubmit = handleSubmit(async (data: TTaskFormValues) => {
    await callAddTask(data);
    onClose();
  });

  useEffect(() => {
    callGetTaskById();
  }, [callGetTaskById]);

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
      <Modal isOpen={true} onClose={onClose} title="Edit Task">
        <TaskForm onSubmit={onSubmit} register={register} errors={errors} />
      </Modal>
    </>
  );
};
