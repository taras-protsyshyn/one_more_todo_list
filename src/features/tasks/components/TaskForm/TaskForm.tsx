import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";

import { Input, Textarea, Select } from "../../../../shared/components/Inputs";
import { Status, Priority } from "../../../../shared/constants";
import { taskFormSchema } from "../../schemas";
import type { TTaskFormValues } from "../../types";

import "./taskForm.css";

type TaskFormProps = {
  onSubmit: (data: TTaskFormValues) => void;
};

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTaskFormValues>({
    resolver: zodResolver(taskFormSchema),
  });

  const submit: SubmitHandler<TTaskFormValues> = (data) => {
    console.log("form data", data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="taskForm">
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
  );
};
