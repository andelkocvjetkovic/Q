import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import Navbar from '@app/components/navbar/Navbar';
import SpinnerFullHeight from '@app/components/spinner/SpinnerFullHeight';

const MainLayout = props => (
  <div>
    <Navbar {...getLoggerProps(props)} />
    <main className='py-2 px-4 bg-gray-100 min-h-[length:var(--main-layout-height)] min-w-full'>
      <Suspense fallback={<SpinnerFullHeight {...getLoggerProps(props)} />}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);

export default withLogger(MainLayout);
