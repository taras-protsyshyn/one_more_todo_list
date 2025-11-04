import { useEffect, useState } from "react";

import { getTaskById } from "../api";

import type { TTask } from "../types";

export const useTaskDetails = (taskId?: string) => {
  const [task, setTask] = useState<TTask | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);

      if (!taskId) {
        setLoading(false);
        setError(new Error("Task ID is required"));
        return;
      }

      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  return { task, loading, error };
};
