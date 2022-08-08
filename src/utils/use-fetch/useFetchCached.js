import { useEffect, useState } from 'react';
import AsyncDataLeaf from '@app/utils/use-fetch/asyncDataLeaf';
import { ApiActionTask } from '@app/utils/use-fetch/api';
import { prop } from 'ramda';

const cache = new Map();

const useFetchCached = uri => {
  const [asyncData, setAsyncData] = useState(AsyncDataLeaf.Loading);

  useEffect(() => {
    let task;
    const key = JSON.stringify(uri);
    if (cache.has(key)) {
      setAsyncData(AsyncDataLeaf.Success(cache.get(key)));
    } else {
      task = ApiActionTask(uri)
        .map(prop('data'))
        .run()
        .listen({
          onCancelled: () => setAsyncData(AsyncDataLeaf.Success([])),
          onResolved: b => {
            setAsyncData(AsyncDataLeaf.Success(b));
            cache.set(key, b);
          },
          onRejected: a => setAsyncData(AsyncDataLeaf.Error(a)),
        });
    }
    return () => {
      task?.cancel();
    };
  }, [uri]);

  return asyncData;
};

export default useFetchCached;
