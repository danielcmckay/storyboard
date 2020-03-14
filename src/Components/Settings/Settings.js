import React, {useContext} from 'react';
import './Settings.css';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import Button from '../Reusable/Button';
import themeContext from '../../context/themeContext';

const Settings = () => {

  const {dark, setDark} = useContext(themeContext);

  const changeThemeHandler = () => {
    setDark(!dark);
    window.localStorage.setItem('darkTheme', !dark);
  }

  const changeStoryOrderHandler = () => {

  }

  return (
    <div className={!dark ? 'Settings' : 'Settings Settings-dark'}>
      <div className="SettingsWrapper">
      <span>Set dark/light theme: <Toggle className="Toggle" onChange={changeThemeHandler} checked={dark} /></span>
      {/* <span>Story order: Newest first <Toggle className="Toggle" onChange={changeStoryOrderHandler} checked={dark} /></span> */}
      <Button>Reset</Button>
      </div>
    </div>
  )
}

export default Settings
