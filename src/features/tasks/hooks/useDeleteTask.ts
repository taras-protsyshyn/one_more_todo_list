import { useState } from "react";
import { deleteTask } from "../api";
import { TaskReducerType } from "../constants";
import { useTasksDispatch } from "../context";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useTasksDispatch();

  const onDelete = async (id: string) => {
    setLoading(true);

    try {
      await deleteTask(id);
      dispatch({ type: TaskReducerType.DeleteTask, id });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { onDelete, loading, error };
};
