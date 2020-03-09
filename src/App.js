import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import StoryBoard from "./Components/StoryBoard/StoryBoard";
import Login from "./Components/Auth/Login";
import Nav from "./Components/Nav/Nav";
import Settings from "./Components/Settings/Settings";
import themeContext from "./context/themeContext";
import { AuthContext } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const App = () => {
  const [dark, setDark] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!window.localStorage.getItem("darkTheme")) {
      window.localStorage.setItem("darkTheme", "false");
    } else {
      window.localStorage.getItem("darkTheme") == "true" && setDark(true);
    }
  }, []);

  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <themeContext.Provider value={{ dark, setDark }}>
        <Nav />
        <Route path='/' exact>
          <StoryBoard />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>

        <Redirect to='/' />
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
          isLoggedIn: isLoggedIn,
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
