import { useState, useCallback } from "react";

type ApiCallState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type Fetcher<T, R = unknown> = (data?: R) => Promise<T>;

type UseCallApiReturn<T, R> = [(requestData?: R) => Promise<void>, ApiCallState<T>];

export const useCallApi = <T, R = unknown>(fetcher: Fetcher<T, R>): UseCallApiReturn<T, R> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const callApi = useCallback(
    async (requestData?: R) => {
      setLoading(true);

      try {
        const result = await fetcher(requestData);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  return [callApi, { data, loading, error }];
};
