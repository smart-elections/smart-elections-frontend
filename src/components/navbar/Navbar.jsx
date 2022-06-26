import './navbar.scss';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='items'>
          <div className='item'>
            <LanguageOutlinedIcon className='icon' />
            English
          </div>
          <div className='item'>
            <DarkModeOutlinedIcon className='icon' />
          </div>
          <div className='item'>
            <SettingsOutlinedIcon className='icon' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
