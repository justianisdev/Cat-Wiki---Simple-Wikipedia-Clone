import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    const authCheck = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}verify`, {
          withCredentials: true,
        });
        Navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    authCheck();
  }, [Navigate]);

  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  function usernameChange(event) {
    setUsername(event.target.value);
  }
  const [password, setPassword] = useState("");
  function passwordChange(event) {
    setPassword(event.target.value);
  }

  const postLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/login`,
        { username, password },
        { withCredentials: true }
      );
      setData(response.data);
      localStorage.setItem("Loggedin", "true");
      localStorage.setItem("username", username);
      Navigate("/");
    } catch (error) {
      console.log(error);
      window.alert("Invalid username or password");
    }
  };
  return (
    <div className="login-page">
      <h1 className="login-page__title">Login With Your Cat Wiki Account</h1>
      <p className="login-page__description">
        Log in to create and edit articles, view users, and interact with the
        community. If you don't have an account{" "}
        <a href="/register" className="login-page__link">
          click here
        </a>
      </p>

      <form
        className="login-page__form"
        onSubmit={(e) => {
          e.preventDefault();
          postLogin();
        }}
      >
        <div className="login-page__form-group">
          <label htmlFor="username" className="login-page__label">
            Username
          </label>
          <input
            id="username"
            className="login-page__input"
            type="text"
            value={username}
            onChange={usernameChange}
            required
          />
        </div>
        <div className="login-page__form-group">
          <label htmlFor="password" className="login-page__label">
            Password
          </label>
          <input
            id="password"
            className="login-page__input"
            type="password"
            value={password}
            onChange={passwordChange}
            required
          />
        </div>
        <button
          onClick={postLogin}
          type="submit"
          className="login-page__button"
        >
          Log Into Cat Wiki
        </button>
      </form>
    </div>
  );
};

export default Login;
