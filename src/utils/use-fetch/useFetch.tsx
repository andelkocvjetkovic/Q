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

const useFetch = <T extends object>(uri: string) => {
  const [asyncData, setAsyncData] = useState<AsyncData<T>>({ kind: 'loading' });

  useEffect(() => {
    let isCanceled = false;
    setAsyncData({ kind: 'loading' });
    ApiActionTask<T>(uri)().then(x => {
      if (!isCanceled)
        pipe(
          x,
          E.map(prop('data')),
          E.fold(
            e => setAsyncData({ kind: 'error', error: e }),
            data => setAsyncData({ kind: 'success', data })
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
