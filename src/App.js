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
import Studies from './pages/Studies';
import Profile from './pages/Profile';
import Logs from "./pages/Logs";
import Login from './layouts/authentication/sign-in';
import LoginAccess from './layouts/authentication/login-access';
import Login2FA from './layouts/authentication/2fa';
import Forgot from './layouts/authentication/forgot';
import Forwarding from './pages/Forwarding';
import Media from './pages/Media_Output';
import TestZone from './pages/TestZone';
import Transfer from "./pages/Transfer";
import AET from './pages/AET';
import NotFound from './pages/NotFound';
import Reports from "./pages/Reports";
import ReportsEdit from "./pages/Reports/ReportsEdit"

/** SETTINGS */
import SiteDesign from "./pages/settings/SiteDesign";
import Security from "./pages/settings/Security";
import Users from "./pages/settings/Users";
import Roles from "./pages/settings/Roles";
import Emailing from "./pages/settings/Emailing";
import System from "./pages/settings/System";
import License from "./pages/settings/License";



/** Layout */
import Loading from "./layouts/Loading";

import Navbar from './components/Navbar';
import NavbarEditReport from './components/NavbarEditReport';
import Sidebar from './components/Sidebar';
import SidebarEditReport from './components/SidebarEditReport';

import secureLocalStorage from "react-secure-storage";
import { EditorState } from 'draft-js';
import { useRef } from 'react';
import { Helmet } from "react-helmet";

function App() {
  const { t, i18n } = useTranslation();

  const [settings, setSettings] = useState(null);
  const [theme, setTheme] = useState(lighttheme);
  const [privileges, setPrivileges] = React.useState();
  const [user, setUser] = React.useState();

  const handleTheme = (props) => {

    let path = window.location.pathname;
    switch (path) {
        case '/login':
        case '/login-access':
        case '/login-2fa':
        case 'forgot':
          setTheme(lighttheme);
          break;
      default:
        setTheme(props === "light" ? lighttheme : darktheme);
    }
  }

  const handleLanguage = (props) => {
    i18n.changeLanguage(props);
  }

  const loadPrivileges = () => {
    
    let privileges = secureLocalStorage.getItem("user.privileges");
    if (privileges) return setPrivileges(privileges);
  }

  const loadUser = () => {
    let user = secureLocalStorage.getItem("user.me");
    if (user) return setUser(user);
  }

  const [darkToggle, setDarkToggle] = React.useState(false)


  const onEditReportPage = () => {
    if (window.location.pathname.includes("/editReports/")) return true;
    return false;
  }

  const [contentState, setContentState] = useState(EditorState.createEmpty());

  React.useEffect(() => {
    UserStorage.getSettings(false)
        .then(set => {
          let user_theme = lighttheme;
          let language = "en";
          let user_dark = false;
          if (set) {
            user_theme = set.theme === "dark"? darktheme : lighttheme;
            user_dark = set.theme === "dark"? true : false;
            language = set.language;
            setSettings(set);
          }
          setTheme(user_theme);
          setDarkToggle(user_dark);
          i18n.changeLanguage(language);
          setSettings([]);
          loadPrivileges();   
          loadUser();
        });
  }, []);


  const reportEdit = useRef();

  const addTextOnReportEdit = (text) => {
    reportEdit.current.addText(text);
  }

  return (
      settings &&
    <Router>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <div className="App"  class={`h-screen w-full flex items-center justify-center flex-col ${
          darkToggle && 'dark'
        }`}>
          <Helmet>
            <html lang={i18n.language} dir={t("dir")} />
          </Helmet>
          {privileges && user && !onEditReportPage() && (

            <div className="w-screen h-screen flex bg-gray-50 px-6 py-4 dark:bg-[#0c111f]" >
              
              <Sidebar className='' privileges={privileges} />
              <div className="flex flex-col h-full w-full">
                <Navbar className="" user={user} />
                <div className="flex flex-col bg-white w-full mt-4 rounded shadow  h-full py-4 px-6 overflow-auto dark:bg-[#0e1627]">
                <div className="px-4 py-4 h-4/5 rounded-xl relative">

                <React.Fragment>
              
                  <Switch >

                    <PrivateRoute exact path="/" component={<Studies />}  />

                    <Route exact path="/login" component={Login} />

                    <Route exact path="/login-access" component={LoginAccess} />

                    <Route exact path="/forgot" component={Forgot} />

                    <PrivateRoute path="/studies" component={<Studies themeChange={handleTheme} darkToggle={darkToggle} />} />

                    <PrivateRoute path="/aet" component={<AET />} />

                    <PrivateRoute path="/forwarding" component={<Forwarding />}  />

                    <PrivateRoute path="/transfer" component={<Transfer />}  />

                    <PrivateRoute path="/media_output" component={<Media />}  />

                    <PrivateRoute path="/logs" component={<Logs />} />

                    <PrivateRoute path="/reports/:studyId" component={<Reports />} />
                    
                    <PrivateRoute path="/editReports/:studyId" component={<ReportsEdit themeChange={handleTheme} darkToggle={darkToggle} setDarkToggle={setDarkToggle} />} />

                    <PrivateRoute exact path="/profile"  component={<Profile themeChange={handleTheme} darkToggle={darkToggle} setDarkToggle={setDarkToggle} languageChange={handleLanguage} />} />

          

                    <PrivateRoute exact path="/site"  component={<SiteDesign />} />

                    <PrivateRoute exact path="/users"  component={<Users />} />

                    <PrivateRoute exact path="/roles"  component={<Roles />} />

                    <PrivateRoute exact path="/emailing"  component={<Emailing />} />

                    <PrivateRoute exact path="/system"  component={<System />} />

                    <PrivateRoute exact path="/license"  component={<License />} />

                    

                    <PrivateRoute exact path="/test"  component={<TestZone />} />

                    <PrivateRoute exact path="/loading"  component={<Loading />} />

                    <PrivateRoute component={<NotFound />}  />

                  </Switch>
              
                </React.Fragment>
                </div>
                </div>
              </div> 
            </div>

          )}

          {!privileges && !user && !onEditReportPage() && (
            <div className="w-screen h-screen flex bg-gray-50 px-6 py-4">
              <Login />
            </div>
          )}

          {
            privileges && user && onEditReportPage() && (
              <div className="w-screen h-screen flex bg-gray-50 px-6 py-4 dark:bg-[#0c111f]" >
                <div className="flex flex-col h-full w-full">
                  <NavbarEditReport className="" user={user} contentState={contentState} />
                  <div className="flex flex-col bg-white w-full mt-4 rounded shadow  h-full py-4 px-6 overflow-auto dark:bg-[#0e1627]">
                    <div className="px-4 py-4 h-full rounded-xl relative flex">
                    <SidebarEditReport className='' addTextOnReportEdit={addTextOnReportEdit} privileges={privileges} />

                      <React.Fragment>
                    
                        <Switch >
                          
                          <PrivateRoute path="/editReports/:studyId" component={<ReportsEdit contentState={contentState} setContentState={setContentState} ref={reportEdit}  />} />

                          <PrivateRoute component={<NotFound />}  />

                        </Switch>
                    
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          
        </div>
      </ThemeProvider>
    </Router >
  )

}

export default App;
