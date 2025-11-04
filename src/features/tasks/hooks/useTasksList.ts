import { useEffect, useState } from "react";

import { getTasks } from "../api";
import { useTasks, useTasksDispatch } from "../context";
import { TaskReducerType } from "../constants";

export const useTasksList = () => {
  const dispatch = useTasksDispatch();
  const tasks = useTasks();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      try {
        const tasks = await getTasks();
        dispatch({ type: TaskReducerType.SetTasks, tasks: tasks });
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return { tasks, loading, error };
};
