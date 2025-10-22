import { useState } from "react";

type ApiCallState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type UseCallApiReturn<T, R> = [(data: R) => Promise<void>, ApiCallState<T>];

type Fetcher<T, R> = (data: R) => Promise<T>;

export const useCallApi = <T, R>(fetcher: Fetcher<T, R>): UseCallApiReturn<T, R> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const callApi = async (requestData: R) => {
    setLoading(true);

    try {
      const result = await fetcher(requestData);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return [callApi, { data, loading, error }];
};
