import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input, Textarea, Select, Loader } from "../../../../shared/components";
import { Status, Priority } from "../../constants";
import type { TTaskFormValues } from "../../types";

import "./taskForm.css";
import type { BaseSyntheticEvent } from "react";

type TaskFormProps = {
  register: UseFormRegister<TTaskFormValues>;
  errors: FieldErrors<TTaskFormValues>;
  onSubmit: (e?: BaseSyntheticEvent<object> | undefined) => Promise<void>;
  loading?: boolean;
};

export const TaskForm = ({ onSubmit, register, errors, loading }: TaskFormProps) => {
  return (
    <Loader loading={loading}>
      <form onSubmit={onSubmit} className="taskForm">
        <Input placeholder="Завдання" {...register("title")} error={errors.title?.message} />
        <Input type="date" {...register("deadline")} error={errors.deadline?.message} />
        <Select
          options={[
            { value: Status.Todo, label: "Todo" },
            { value: Status.InProgress, label: "In Progress" },
            { value: Status.Done, label: "Done" },
          ]}
          {...register("status")}
        />
        <Select
          options={[
            { value: Priority.Low, label: "Low" },
            { value: Priority.Medium, label: "Medium" },
            { value: Priority.High, label: "Hight" },
          ]}
          {...register("priority")}
        />
        <Textarea
          rows={3}
          wrapperClassName="description"
          placeholder="Опис"
          {...register("description")}
        />
        <button disabled={!!Object.keys(errors).length} type="submit">
          Save
        </button>
      </form>
    </Loader>
  );
};
