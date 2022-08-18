import './assets/App.css';
import React from 'react';
import darktheme from './styles/darktheme';
import lighttheme from './styles/lighttheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { useState } from 'react';
import PrivateRoute from "./routes/PrivateRoute";

import UserStorage from "./services/storage/user.storage";

/** PAGE */
import Home from './pages/Home';
import Menu from './layouts/Menu';
import SettingsMenu from './layouts/SettingsMenu';
import Studies from './pages/Studies';
import Profile from './pages/Profile';
import Logs from "./pages/Logs";
import Login from './layouts/authentication/sign-in';
import LoginAccess from './layouts/authentication/login-access';
import Forgot from './layouts/authentication/forgot';
import Forwarding from './pages/Forwarding';
import Media from './pages/Media_Output';
import TestZone from './pages/TestZone';
import Transfer from "./pages/Transfer";
import AET from './pages/AET';
import NotFound from './pages/NotFound';

/** SETTINGS */
import SiteDesign from "./pages/settings/SiteDesign";
import Users from "./pages/settings/Users";
import Roles from "./pages/settings/Roles";
import Emailing from "./pages/settings/Emailing";
import System from "./pages/settings/System";
import About from "./pages/settings/About";
import License from "./pages/settings/License";
import ChangePassword from "./pages/settings/ChangePassword";

/** Layout */
import Loading from "./layouts/Loading";

function App() {

  const [settings, setSettings] = useState(null);
  const [theme, setTheme] = useState(lighttheme);



  //eslint-disable-next-line
  const [language, setLanguage] = useState(localStorage.getItem('language') !== null ? localStorage.getItem('language') : "en")

  const handleTheme = (props) => {
    setTheme(props === "light" ? lighttheme : darktheme)
  }

  const handleLanguage = (props) => {
    setLanguage(props)
  }

  React.useEffect(() => {
    UserStorage.getSettings(false)
        .then(set => {
          let user_theme = lighttheme;
          if (set) {
            user_theme = set.theme === "dark"? darktheme : lighttheme;
            setSettings(set);
          }
          setTheme(user_theme);
          setSettings([]);
        });
  }, []);

  return (
      settings &&
    <Router>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <div className="App">
          <React.Fragment>
            
            {/* <RoleContext.Provider value={{ privileges }}> */}
            <Switch>

              <PrivateRoute exact path="/" component={<Home />} menu={Menu} />

              <Route exact path="/login" component={Login} />

              <Route exact path="/login-access" component={LoginAccess} />

              <Route exact path="/forgot" component={Forgot} />

              <PrivateRoute path="/studies" component={<Studies />} menu={Menu} />

              <PrivateRoute path="/aet" component={<AET />} menu={Menu} />

              <PrivateRoute path="/forwarding" component={<Forwarding />} menu={Menu} />

              <PrivateRoute path="/transfer" component={<Transfer />} menu={Menu} />

              <PrivateRoute path="/media_output" component={<Media />} menu={Menu} />

              <PrivateRoute path="/logs" component={<Logs />} menu={Menu} />

              <PrivateRoute exact path="/profile" menu={Menu} component={<Profile themeChange={handleTheme} languageChange={handleLanguage} />} />

              {/* SETTINGS */}
              <PrivateRoute exact path="/changePassword" component={<ChangePassword />} menu={SettingsMenu} />

              <PrivateRoute exact path="/site" menu={SettingsMenu} component={<SiteDesign />} />

              <PrivateRoute exact path="/users" menu={SettingsMenu} component={<Users />} />

              <PrivateRoute exact path="/roles" menu={SettingsMenu} component={<Roles />} />

              <PrivateRoute exact path="/emailing" menu={SettingsMenu} component={<Emailing />} />

              <PrivateRoute exact path="/system" menu={SettingsMenu} component={<System />} />

              <PrivateRoute exact path="/about" menu={SettingsMenu} component={<About />} />

              <PrivateRoute exact path="/license" menu={SettingsMenu} component={<License />} />

              {/* AUTRES PAGES */}

              <PrivateRoute exact path="/test" menu={Menu} component={<TestZone />} />

              <PrivateRoute exact path="/loading" menu={Menu} component={<Loading />} />

              <PrivateRoute component={<NotFound />} menu={Menu} />

            </Switch>
            {/* </RoleContext.Provider> */}
          </React.Fragment>
        </div>
      </ThemeProvider>
    </Router >
  )

}

export default App;
