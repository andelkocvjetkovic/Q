import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import MainLayout from '@app/components/main-layout/MainLayout';
import { UserContext } from '@app/utils/use-fetch/useUsers';
import useFetch from '@app/utils/use-fetch/useFetch';

const PostsLazy = lazy(() => import('@app/pages/Posts'));

const App = props => {
  const users = useFetch('/users');

  return (
    <UserContext.Provider value={users}>
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='posts' element={<MainLayout {...getLoggerProps(props)} />}>
          <Route index element={<PostsLazy {...getLoggerProps(props)} />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default withLogger(App);
