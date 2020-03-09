import React, { useContext, useState } from "react";
import "./Login.css";
import Button from "../Reusable/Button";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../Reusable/Spinner";
import ErrorModal from '../Reusable/ErrorModal';

const Login = () => {
  const [user, setUser] = useState({
    email: {
      value: "",
      isValid: false
    },
    password: {
      value: "",
      isValid: false
    }
  });
  const [loginMode, setLoginMode] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const onChangeHandler = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const auth = useContext(AuthContext);

  const loginHandler = async e => {
    e.preventDefault();
    setLoading(true);

    if (loginMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          setLoading(false);

          throw new Error(responseData.message)
        }
        setLoading(false);
        auth.login(responseData.user.id);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password
          })
        });

        const responseData = await response.json();
        console.log(responseData.user.id)
        if (!response.ok) {
          setLoading(false);

          throw new Error(responseData.message)
        }
        setLoading(false);
        auth.login(responseData.user.id);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
    }
  };

  const loginModeHandler = () => {
    setLoginMode(!loginMode);
  };


  return (
    <div className="Login">
      {isLoading ? (
        <Spinner loading={true}></Spinner>
      ) : (
        <>
          <span className="Title">
            <h1>StoryBoard</h1>
            <span className="title-decoration-wrapper">
              <div className="title-decoration"></div>
              <div className="title-decoration"></div>
              <div className="title-decoration"></div>
            </span>
          </span>
          <p>Because keeping track of ideas should be easy.</p>
          <form onSubmit={loginHandler}>
            <span>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="jdoe@gmail.com"
                onChange={onChangeHandler}
              ></input>
            </span>
            <span>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={onChangeHandler}
              ></input>
            </span>
            <Button type="submit">{loginMode ? "Login" : "Sign up"}</Button>{" "}
          </form>
          <Button
            type="button"
            classes="LoginBtn LoginBtnAlt"
            onClick={loginModeHandler}
          >
            {loginMode ? "Not a user? Sign up!" : "Already a user? Login"}
          </Button>
          {error && <ErrorModal message={error} />}

        </>
      )}
    </div>
  );
};

export default Login;
