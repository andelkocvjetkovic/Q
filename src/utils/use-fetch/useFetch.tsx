import { useState, useEffect } from 'react';
import { prop } from 'ramda';
import { ApiActionTask } from '@app/utils/use-fetch/api';

export interface AsyncDataSuccess<T> {
  kind: 'success';
  data: T;
}
export interface AsyncDataLoading {
  kind: 'loading';
}
export interface AsyncDataError {
  kind: 'error';
  error: Error;
}

export type AsyncData<T> = AsyncDataLoading | AsyncDataError | AsyncDataSuccess<T>;

const useFetch = <T extends object>(uri: string) => {
  const [asyncData, setAsyncData] = useState<AsyncData<T>>({ kind: 'loading' });

  useEffect(() => {
    setAsyncData({ kind: 'loading' });
    const task = ApiActionTask(uri)
      .map(prop('data'))
      .run()
      .listen({
        onCancelled: () => null, // TODO handle canceled fetch
        onResolved: (b: T) => setAsyncData({ kind: 'success', data: b }),
        onRejected: (e: Error) => setAsyncData({ kind: 'error', error: e }),
      });
    return () => {
      task.cancel();
    };
  }, [uri]);

  return asyncData;
};

export default useFetch;
