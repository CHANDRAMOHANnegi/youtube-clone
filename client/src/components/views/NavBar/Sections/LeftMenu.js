import React from 'react';
import { Menu } from 'antd';
import ThemeToggle from '../../../ThemeToggle';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    
    </Menu.Item>
    <Menu.Item key="subscription">
      <a href="/subscription">Subscription</a>
    </Menu.Item>
    {/* <Menu.Item key="subscription">
    <ThemeToggle/>
    </Menu.Item> */}
  </Menu>
  )
}

export default LeftMenu