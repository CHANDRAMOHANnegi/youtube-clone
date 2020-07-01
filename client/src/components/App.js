import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
// import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage"
import DetailVideoPage from "./views/DetailVideoPage/DetailVideoPage"
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"

import ThemeContextProvider from '../_context/themeContext';
import AuthContextProvider from '../_context/authContext.js';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <ThemeContextProvider>
        <AuthContextProvider>
        <NavBar />
        <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/video/upload" component={UploadVideoPage} />
            <Route exact path="/video/:videoId" component={DetailVideoPage} />
            <Route exact path="/subscription" component={SubscriptionPage} />
          </Switch>
        </div>
        <Footer />
        </AuthContextProvider>
      </ThemeContextProvider>
    </Suspense>
  );
}

export default App;
