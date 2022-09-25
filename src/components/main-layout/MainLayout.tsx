import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import withLogger from '@app/utils/logger/withLogger';
import Navbar from '@app/components/navbar/Navbar';
import SpinnerFullHeight from '@app/components/spinner/SpinnerFullHeight';

const MainLayout = () => (
  <div>
    <Navbar />
    <main className='py-2 px-4 bg-gray-100 min-h-[length:var(--main-layout-height)] min-w-full'>
      <Suspense fallback={<SpinnerFullHeight />}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);

export default withLogger(MainLayout);
