import React from "react";
import "./Login.css";
import Button from "../Reusable/Button";

const Login = () => {
  return (
    <div className="Login">
      <span className="Title">
        <h1>StoryBoard</h1>
        <span className="title-decoration-wrapper">
          <div className="title-decoration"></div>
          <div className="title-decoration"></div>
          <div className="title-decoration"></div>
        </span>
      </span>
      <p>Because keeping track of ideas should be easy.</p>
      <form>
        <span>
        <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="jdoe@gmail.com"></input>
          </span>
          <span>
        <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="password"></input>
          </span>
        <Button className='LoginBtn'>Login</Button>
      </form>
    </div>
  );
};

export default Login;
