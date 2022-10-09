import { useState, useEffect } from 'react';
import { fold } from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { ApiActionTask } from '@app/utils/use-fetch/api';
import { prop } from 'ramda';
import { pipe } from 'fp-ts/function';

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

const createAsyncSuccess = <T,>(data: T): AsyncDataSuccess<T> => ({
  kind: 'success',
  data,
});

const createAsyncError = (error: Error): AsyncDataError => ({
  kind: 'error',
  error,
});

const asyncDataLoading: AsyncDataLoading = {
  kind: 'loading',
};

const useFetch = <T extends object>(uri: string) => {
  const [asyncData, setAsyncData] = useState<AsyncData<T>>(asyncDataLoading);

  useEffect(() => {
    let isCanceled = false;
    setAsyncData(asyncDataLoading);
    ApiActionTask<T>(uri)().then(x => {
      if (!isCanceled)
        pipe(
          x,
          E.map(prop('data')),
          E.fold(
            e => setAsyncData(createAsyncError(e)),
            data => setAsyncData(createAsyncSuccess(data))
          )
        );
    });
    return () => {
      isCanceled = true;
    };
  }, [uri]);

  return asyncData;
};

export default useFetch;
