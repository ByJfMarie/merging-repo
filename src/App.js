import './assets/App.css';
import React from 'react';
import darktheme from './styles/darktheme';
import lighttheme from './styles/lighttheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { useState } from 'react';
import PrivateRoute from "./routes/PrivateRoute";

import UserStorage from "./services/storage/user.storage";

/** Translation */
import "./translations/i18n";
import { useTranslation } from 'react-i18next';

/** PAGE */
import PrySideBar from './layouts/menu/PrySideBar';
import PrySideBarSettings from './layouts/menu/PrySideBarSettings';
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
import Security from "./pages/settings/Security";
import Users from "./pages/settings/Users";
import Roles from "./pages/settings/Roles";
import Emailing from "./pages/settings/Emailing";
import System from "./pages/settings/System";
import License from "./pages/settings/License";
import ChangePassword from "./pages/settings/ChangePassword";

/** Layout */
import Loading from "./layouts/Loading";

function App() {
  const { i18n } = useTranslation();

  const [settings, setSettings] = useState(null);
  const [theme, setTheme] = useState(lighttheme);

  const handleTheme = (props) => {
    setTheme(props === "light" ? lighttheme : darktheme)
  }

  const handleLanguage = (props) => {
    i18n.changeLanguage(props);
  }

  React.useEffect(() => {
    UserStorage.getSettings(false)
        .then(set => {
          let user_theme = lighttheme;
          let language = "en";
          if (set) {
            user_theme = set.theme === "dark"? darktheme : lighttheme;
            language = set.language;
            setSettings(set);
          }
          setTheme(user_theme);
          i18n.changeLanguage(language);
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

              <PrivateRoute exact path="/" component={<Studies />} menu={PrySideBar} />

              <Route exact path="/login" component={Login} />

              <Route exact path="/login-access" component={LoginAccess} />

              <Route exact path="/forgot" component={Forgot} />

              <PrivateRoute path="/studies" component={<Studies />} menu={PrySideBar} />

              <PrivateRoute path="/aet" component={<AET />} menu={PrySideBar} />

              <PrivateRoute path="/forwarding" component={<Forwarding />} menu={PrySideBar} />

              <PrivateRoute path="/transfer" component={<Transfer />} menu={PrySideBar} />

              <PrivateRoute path="/media_output" component={<Media />} menu={PrySideBar} />

              <PrivateRoute path="/logs" component={<Logs />} menu={PrySideBar} />

              <PrivateRoute exact path="/profile" menu={PrySideBar} component={<Profile themeChange={handleTheme} languageChange={handleLanguage} />} />

              {/* SETTINGS */}
              <PrivateRoute exact path="/changePassword" component={<ChangePassword />} menu={PrySideBarSettings} />

              <PrivateRoute exact path="/site" menu={PrySideBarSettings} component={<SiteDesign />} />

              <PrivateRoute exact path="/security" menu={PrySideBarSettings} component={<Security />} />

              <PrivateRoute exact path="/users" menu={PrySideBarSettings} component={<Users />} />

              <PrivateRoute exact path="/roles" menu={PrySideBarSettings} component={<Roles />} />

              <PrivateRoute exact path="/emailing" menu={PrySideBarSettings} component={<Emailing />} />

              <PrivateRoute exact path="/system" menu={PrySideBarSettings} component={<System />} />

              <PrivateRoute exact path="/license" menu={PrySideBarSettings} component={<License />} />

              {/* AUTRES PAGES */}

              <PrivateRoute exact path="/test" menu={PrySideBar} component={<TestZone />} />

              <PrivateRoute exact path="/loading" menu={PrySideBar} component={<Loading />} />

              <PrivateRoute component={<NotFound />} menu={PrySideBar} />

            </Switch>
            {/* </RoleContext.Provider> */}
          </React.Fragment>
        </div>
      </ThemeProvider>
    </Router >
  )

}

export default App;
