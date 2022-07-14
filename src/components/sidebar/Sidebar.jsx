import './sidebar.scss';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import { useState } from 'react';

// State Context
import useAppStateContext from '../../hooks/useAppStateContext';

// Logout modal
import CustomModal from '../../components/modal/CustomModal';

const Sidebar = () => {
  const { dispatch } = useAppStateContext();

  // Logout modal state and functions
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Logout modal buttons components
  const ActionButton = ({ handleClose }) => {
    const handleLogout = () => {
      dispatch({ type: 'Logout' });
      handleClose(); // close modal
    };
    return (
      <button autoFocus onClick={handleLogout} className='actionButton'>
        Logout
      </button>
    );
  };

  const CancelButton = ({ handleClose }) => (
    <button autoFocus onClick={handleClose} className='cancelButton'>
      Cancel
    </button>
  );

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

          <li onClick={handleClickOpen}>
            <ExitToAppOutlinedIcon className='icon' />
            <span>Logout</span>
          </li>
          <CustomModal
            title='Logout'
            contentMessage='Are you sure you want to logout?'
            open={open}
            handleClose={handleClose}
            ActionButton={ActionButton}
            CancelButton={CancelButton}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
