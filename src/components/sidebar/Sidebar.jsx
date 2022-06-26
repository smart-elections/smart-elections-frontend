import './sidebar.scss';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('logout');
    navigate('/login');
  };
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' className='navLink'>
          <img
            src={Logo}
            alt='Logo de la République française (1999)'
            draggable='false'
          />
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul className='centerUnorderedList'>
          <p className='title'>MAIN</p>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : 'navLink'
            }
          >
            <li>
              <InsightsOutlinedIcon className='icon' />
              <span>Analytics</span>
            </li>
          </NavLink>
          <NavLink
            to='/elections'
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : 'navLink'
            }
          >
            <li>
              <HowToVoteOutlinedIcon className='icon' />
              <span>Elections</span>
            </li>
          </NavLink>
          <NavLink
            to='/candidates'
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : 'navLink'
            }
          >
            <li>
              <PeopleOutlinedIcon className='icon' />
              <span>Candidates</span>
            </li>
          </NavLink>

          <p className='title'>OTHER</p>
          <NavLink
            to='/news'
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : 'navLink'
            }
          >
            <li>
              <FeedOutlinedIcon className='icon' />
              <span>News</span>
            </li>
          </NavLink>

          <p className='title'>USER</p>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive ? 'activeNavLink' : 'navLink'
            }
          >
            <li>
              <AccountCircleOutlinedIcon className='icon' />
              <span>Profile</span>
            </li>
          </NavLink>

          <li onClick={handleLogout}>
            <ExitToAppOutlinedIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
