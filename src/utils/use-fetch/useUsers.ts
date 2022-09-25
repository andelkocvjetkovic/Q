import { createContext, useContext } from 'react';
import { AsyncData } from '@app/utils/use-fetch/useFetch';
import { User } from '@app/utils/types';

const UserContext = createContext<AsyncData<User[]>>({ kind: 'loading' });

const useUsers = () => useContext(UserContext);

export { UserContext, useUsers };
