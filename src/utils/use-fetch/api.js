import axios from 'axios';
import { task } from 'folktale/concurrency/task';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

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

export { ApiActionTask, BASE_URL };
