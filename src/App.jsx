import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import MainLayout from '@app/components/main-layout/MainLayout';
import { UserContext } from '@app/utils/use-fetch/useUsers';
import useFetch from '@app/utils/use-fetch/useFetch';
import useScrollTop from '@app/utils/use-scroll-top/useScrollTop';

const PostsLazy = lazy(() => import('@app/pages/posts/Posts'));
const PostLazy = lazy(() => import('@app/pages/Post'));

const App = props => {
  const users = useFetch('/users');

  useScrollTop();

  return (
    <UserContext.Provider value={users}>
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='posts' element={<MainLayout {...getLoggerProps(props)} />}>
          <Route index element={<PostsLazy {...getLoggerProps(props)} />} />
          <Route path=':postId' element={<PostLazy {...getLoggerProps(props)} />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default withLogger(App);
