import withLogger from '@app/utils/logger/withLogger';
import { NavLink } from 'react-router-dom';
const Navbar = () => (
  <nav className='bg-gray-800 flex items-center px-4 py-2'>
    <NavLink
      to='/posts'
      end
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
      }
    >
      Posts
    </NavLink>
  </nav>
);

export default withLogger(Navbar);
