import { Outlet } from 'react-router-dom';
import withLogger from '@app/utils/logger/withLogger';
const MainLayout = () => (
  <main>
    <Outlet />
  </main>
);

export default withLogger(MainLayout);
