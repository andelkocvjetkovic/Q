import { useState, useEffect } from 'react';
import daggy from 'daggy';
import axios from 'axios';
import { task } from 'folktale/concurrency/task';
import { prop } from 'ramda';

export const BASE_URL = 'https://jsonplaceholder.typicode.com';

// ApiActionTask :: String -> Task Error Result
const ApiActionTask = uri =>
  task(resolver => {
    const abortController = new AbortController();
    axios
      .get(uri, { signal: abortController.signal, baseURL: BASE_URL })
      .then(resolver.resolve)
      .catch(e => !resolver.isCancelled && resolver.reject(e));

    resolver.onCancelled(() => abortController.abort());
  });

export const AsyncDataLeaf = daggy.taggedSum('AsyncData', {
  Loading: [],
  Success: ['data'],
  Error: ['error'],
});

const useFetch = uri => {
  const [asyncData, setAsyncData] = useState(AsyncDataLeaf.Loading);
  useEffect(() => {
    const task = ApiActionTask(uri)
      .map(prop('data'))
      .run()
      .listen({
        onCancelled: () => setAsyncData(AsyncDataLeaf.Success([])),
        onResolved: b => setAsyncData(AsyncDataLeaf.Success(b)),
        onRejected: a => setAsyncData(AsyncDataLeaf.Error(a)),
      });
    return () => {
      task.cancel();
    };
  }, [uri]);

  return asyncData;
};

export default useFetch;
