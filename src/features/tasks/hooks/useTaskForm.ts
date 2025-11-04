import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Status, Priority } from "../constants";
import { taskFormSchema } from "../schemas";
import type { TTaskFormValues } from "../types";

export const useTaskForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TTaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      status: Status.Todo,
      priority: Priority.Low,
    },
  });

  return { register, handleSubmit, setValue, errors };
};
