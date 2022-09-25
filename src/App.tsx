import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { lazy } from 'react';
import withLogger from '@app/utils/logger/withLogger';
import MainLayout from '@app/components/main-layout/MainLayout';
import { UserContext } from '@app/utils/use-fetch/useUsers';
import useFetch from '@app/utils/use-fetch/useFetch';
import useScrollTop from '@app/utils/use-scroll-top/useScrollTop';
import { User } from '@app/utils/types';

const PostsLazy = lazy(() => import('@app/pages/posts/Posts'));
const PostLazy = lazy(() => import('@app/pages/Post'));

const App = () => {
  const users = useFetch<User[]>('/users');

  useScrollTop();

  return (
    <UserContext.Provider value={users}>
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='posts' element={<MainLayout />}>
          <Route index element={<PostsLazy />} />
          <Route path=':postId' element={<PostLazy />} />
        </Route>
        <Route
          path='*'
          element={
            <main className='h-screen w-screen flex items-center justify-center'>
              <div className='d-flex flex-col gap-3'>
                <h1 className='text-3xl'>There is nothing here!</h1>
                <Link to='/'>Back to home</Link>
              </div>
            </main>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default withLogger(App);
