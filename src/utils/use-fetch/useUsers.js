import { createContext, useContext } from 'react';
import AsyncDataLeaf from '@app/utils/use-fetch/asyncDataLeaf';

const UserContext = createContext(AsyncDataLeaf.Loading);

const useUsers = () => useContext(UserContext);

export { UserContext, useUsers };
