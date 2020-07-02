import React from 'react';
import { Menu } from 'antd';
// import ThemeToggle from '../../../ThemeToggle';

import { Link } from 'react-router-dom';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="subscription">
        <Link to="/subscription">Subscription</Link>
      </Menu.Item>
      {/* <Menu.Item key="subscription">
        <ThemeToggle />
      </Menu.Item> */}
    </Menu>
  )
}

export default LeftMenu;