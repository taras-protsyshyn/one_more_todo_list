import { addTask } from "../api";
import { TaskReducerType } from "../constants";
import { useTasksDispatch } from "../context";
import { useApiStateCall } from "../../../shared/hooks";

import type { TTask, TTaskFormValues } from "../types";

type UseAddTaskOptions = {
  onSuccess?: (data: TTask) => void;
};

export const useAddTask = ({ onSuccess }: UseAddTaskOptions) => {
  const dispatch = useTasksDispatch();

  return useApiStateCall<TTask, TTaskFormValues>(addTask, {
    onSuccess: (newTask) => {
      dispatch({ type: TaskReducerType.AddTask, task: newTask });
      if (onSuccess) {
        onSuccess(newTask);
      }
    },
  });
};
