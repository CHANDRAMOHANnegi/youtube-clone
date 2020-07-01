 import React, { useContext } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
 import { AuthContext } from '../../../../_context/authContext';
const Upload = require('../../../../images/upload.png');

function RightMenu(props) {

  const context = useContext(AuthContext);

  const { isAuthenticated, userData } = context.authData;
  console.log(context);

  const logoutHandler = () => {
    localStorage.clear();
    context.setUser("");
    console.log(localStorage, props);
    props.history.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="create">
          <a href="/video/upload"> {userData.firstname} <img src={Upload} alt="Upload" /></a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

