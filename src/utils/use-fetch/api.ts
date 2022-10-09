import axios, { AxiosResponse } from 'axios';
import { tryCatch } from 'fp-ts/TaskEither';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const ApiActionTask = <T>(path: string) =>
  tryCatch<Error, AxiosResponse<T>>(
    () => axios.get(path, { baseURL: BASE_URL }),
    e => new Error(String(e))
  );

export { ApiActionTask, BASE_URL };
