import type { BaseSyntheticEvent } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input, Textarea, Select, Loader, Button } from "../../../../shared/components";
import { Status, Priority } from "../../constants";
import type { TTaskFormValues } from "../../types";

import "./taskForm.css";

type TaskFormProps = {
  register: UseFormRegister<TTaskFormValues>;
  errors: FieldErrors<TTaskFormValues>;
  onSubmit: (e?: BaseSyntheticEvent<object> | undefined) => Promise<void>;
  loading?: boolean;
  submitting?: boolean;
};

export const TaskForm = ({ onSubmit, register, errors, loading, submitting }: TaskFormProps) => {
  return (
    <Loader loading={loading}>
      <form onSubmit={onSubmit} className="taskForm">
        <Input
          placeholder="Завдання"
          {...register("title")}
          error={errors.title?.message}
          disabled={submitting}
        />
        <Input
          type="date"
          {...register("deadline")}
          error={errors.deadline?.message}
          disabled={submitting}
        />
        <Select
          options={[
            { value: Status.Todo, label: "Todo" },
            { value: Status.InProgress, label: "In Progress" },
            { value: Status.Done, label: "Done" },
          ]}
          {...register("status")}
          disabled={submitting}
        />
        <Select
          options={[
            { value: Priority.Low, label: "Low" },
            { value: Priority.Medium, label: "Medium" },
            { value: Priority.High, label: "Hight" },
          ]}
          {...register("priority")}
          disabled={submitting}
        />
        <Textarea
          rows={3}
          wrapperClassName="description"
          placeholder="Опис"
          {...register("description")}
          disabled={submitting}
        />
        <Button disabled={!!Object.keys(errors).length} loading={submitting} type="submit">
          Save
        </Button>
      </form>
    </Loader>
  );
};
