import React, { useContext } from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import axios from "../../../../axios";
import { AuthContext } from '../../../../_context/authContext';
const Upload = require('../../../../images/upload.png');

function RightMenu(props) {

  const context = useContext(AuthContext);

  const { isAuthenticated, userData } = context.authData;
  console.log(context);

  const logoutHandler = () => {
    // const requestBody = `
    //  {
    //    logOut
    // }`;

    // axios.post('/', {
    //   query: requestBody,
    // }).then(response => {
    //   console.log(response);
    //   if (response) {
    //     if (response.data.data.logOut) {
    localStorage.clear();
    context.setUser("");
    console.log(localStorage, props);
    props.history.push("/login");
    //     }
    //   } else {
    //     alert('Failed to save Comment')
    //   }
    // });

  };

  if (!isAuthenticated) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="create">
          <Link to="/video/upload"> {userData.firstname} <img src={Upload} alt="Upload" /></Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Link onClick={logoutHandler}>Logout</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

