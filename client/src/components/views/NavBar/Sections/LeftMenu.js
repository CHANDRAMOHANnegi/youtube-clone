import React from 'react';
import { Menu } from 'antd';
import ThemeToggle from '../../../ThemeToggle';

import { Link } from 'react-router-dom';

function LeftMenu(props) {


  console.log(props);
  

  const { isLightTheme, light, dark } = props.themeContext;
  const { isAuthenticated } = props.authContext.authData;

  const theme = isLightTheme ? light : dark;

  return (
    <Menu mode={props.mode} style={{
      backgroundColor: theme.backgroundColor
    }}>
      <Menu.Item key="mail">
        <Link to="/" style={{ color: theme.color }}>Home</Link>
      </Menu.Item>

      {isAuthenticated ?
        <Menu.Item key="subscription">
          <Link to="/subscription" style={{ color: theme.color }}>
            Subscription
        </Link>
        </Menu.Item> : null}

      <Menu.Item key="theme_toggle">
        <ThemeToggle />
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu;