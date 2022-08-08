import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import MainLayout from '@app/components/main-layout/MainLayout';

const PostsLazy = lazy(() => import('@app/pages/Posts'));

const App = props => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/posts' />} />
      <Route path='posts' element={<MainLayout {...getLoggerProps(props)} />}>
        <Route index element={<PostsLazy {...getLoggerProps(props)} />} />
      </Route>
    </Routes>
  );
};

export default withLogger(App);
