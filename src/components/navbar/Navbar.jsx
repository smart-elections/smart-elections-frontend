import { useState, useEffect, useContext } from 'react';
import './navbar.scss';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import { DarkModeContext } from '../../context/darkModeContext';

const Navbar = () => {
  const [theme, setTheme] = useState('');
  const { dispatch } = useContext(DarkModeContext);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('smartVotingTheme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme('LIGHT');
    }
  }, [theme]);

  const handleThemeChange = () => {
    dispatch({ type: 'TOGGLE' });
    if (theme === 'LIGHT') {
      setTheme('DARK');
    } else {
      setTheme('LIGHT');
    }
  };

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='items'>
          <div className='item'>
            <LanguageOutlinedIcon className='icon' />
            English
          </div>
          <div className='item'>
            {theme === 'DARK' ? (
              <DarkModeOutlinedIcon
                className='icon'
                style={{ cursor: 'pointer' }}
                onClick={handleThemeChange}
              />
            ) : (
              <LightModeIcon
                className='icon'
                style={{ cursor: 'pointer' }}
                onClick={handleThemeChange}
              />
            )}
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
