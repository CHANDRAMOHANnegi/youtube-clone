import React, { useState, useContext } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import { ThemeContext } from '../../../_context/themeContext';
import { AuthContext } from '../../../_context/authContext';
const Logo = require('../../../images/HappyTubeLogo.png');

function NavBar() {
  const [visible, setVisible] = useState(false)

  const authContext = useContext(AuthContext);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <ThemeContext.Consumer>{
      (context) => {
        const { isLightTheme, light, dark } = context;
        const theme = isLightTheme ? light : dark;

        console.log(context, authContext);

        return <nav className="menu"
          style={{
            position: 'fixed',
            zIndex: 1, width: '100%',
            backgroundColor: theme.backgroundColor,
            boxShadow: !isLightTheme && 'none'
          }}>
          <div className="menu__logo">
            <a href="/"><img src={Logo}
              alt="Logo"
              style={{ width: '100%', marginTop: '-5px' }} />
            </a>
          </div>
          <div className="menu__container">
            <div className="menu_left">
              <LeftMenu mode="horizontal" themeContext={context} authContext={authContext} />
            </div>
            <div className="menu_rigth" >
              <RightMenu mode="horizontal" authContext={authContext} />
            </div>
            <Button
              className="menu__mobile-button"
              type="primary"
              onClick={showDrawer}>
              <Icon type="align-right" />
            </Button>
            <Drawer
              title="Basic Drawer"
              placement="right"
              className="menu_drawer"
              closable={false}
              onClose={onClose}
              visible={visible}>
              <LeftMenu mode="inline"  themeContext={context} authContext={authContext}/>
              <RightMenu mode="inline"  authContext={authContext} />
            </Drawer>
          </div>
        </nav>
      }
    }
    </ThemeContext.Consumer>
  )
}

export default NavBar