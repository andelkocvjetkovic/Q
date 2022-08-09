import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import withLogger from '@app/utils/logger/withLogger';
const MainLayout = () => (
  <main>
    <Suspense fallback={<div>Loading ...</div>}>
      <Outlet />
    </Suspense>
  </main>
);

export default withLogger(MainLayout);
