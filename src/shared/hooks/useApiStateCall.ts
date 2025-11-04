import { useState } from "react";

type ApiCallState = {
  loading: boolean;
  error: Error | null;
};

type Fetcher<T, R = unknown> = (data: R) => Promise<T>;

type TOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

type UseCallApiReturn<R> = [(requestData: R) => Promise<void>, ApiCallState];

export const useApiStateCall = <T, R = unknown>(
  fetcher: Fetcher<T, R>,
  options: TOptions<T> = {}
): UseCallApiReturn<R> => {
  const { onSuccess, onError } = options;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const callApi = async (requestData: R) => {
    setLoading(true);

    try {
      const result = await fetcher(requestData);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      if (onError) {
        onError(err as Error);
      } else {
        setError(err as Error);
      }
    } finally {
      setLoading(false);
    }
  };

  return [callApi, { loading, error }];
};
