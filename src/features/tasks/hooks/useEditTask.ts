import { TaskReducerType } from "../constants";
import { useTasksDispatch } from "../context";
import { updateTask } from "../api";
import { useApiStateCall } from "../../../shared/hooks";

import type { TEditTask, TTask } from "../types";

type UseEditTaskOptions = {
  onSuccess?: (data: TTask) => void;
};

export const useEditTask = ({ onSuccess }: UseEditTaskOptions) => {
  const dispatch = useTasksDispatch();

  return useApiStateCall<TTask, TEditTask>(updateTask, {
    onSuccess: (task) => {
      dispatch({ type: TaskReducerType.UpdateTask, task: task });
      if (onSuccess) {
        onSuccess(task);
      }
    },
  });
};
