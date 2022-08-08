import { useState, useEffect } from 'react';
import AsyncDataLeaf from '@app/utils/use-fetch/asyncDataLeaf';
import { prop } from 'ramda';
import { ApiActionTask } from '@app/utils/use-fetch/api';

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
