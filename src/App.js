import React, { useState, useEffect} from "react";
import "./App.css";
import StoryBoard from "./Components/StoryBoard/StoryBoard";
import Login from "./Components/Auth/Login";
import Nav from "./Components/Nav/Nav";
import Settings from "./Components/Settings/Settings";
import themeContext from "./context/themeContext";
import { AuthContext } from "./context/AuthContext";
import useAuth from './hooks/auth-hook';


import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";


const App = () => {
  const {userId, token, login, logout} = useAuth();
  const [dark, setDark] = useState();

  useEffect(() => {
    if (!window.localStorage.getItem("darkTheme")) {
      window.localStorage.setItem("darkTheme", "false");
    } else {
      window.localStorage.getItem("darkTheme") === 'true' && setDark(true);
    }
  }, []);

  let routes;

  if (token) {
    routes = (
      <themeContext.Provider value={{ dark, setDark }}>
        <Nav />
        <Route path="/" exact>
          <StoryBoard />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>

        <Redirect to="/" />
      </themeContext.Provider>
    );
  } else {
    routes = (
      <Route path="/" exact>
        <Login />
      </Route>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
          userId: userId
        }}
      >
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
