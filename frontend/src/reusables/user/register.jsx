import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState("");
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

  const postData = async (event) => {
    try {
      event.preventDefault();

      if (!username.trim() || !password.trim()) {
        window.alert("Username and password are required.");
        return;
      }

      if (username.length < 3 || password.length < 6) {
        window.alert(
          "Username must be at least 3 characters, and password at least 6."
        );
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/register`,
        { username, password },
        { withCredentials: true }
      );
      setData(response.data);
      Navigate("/login");
    } catch (error) {
      console.log(error);
      window.alert("Username taken!");
    }
  };

  const [username, setUsername] = useState("");
  function usernameChange(event) {
    setUsername(event.target.value);
  }
  const [password, setPassword] = useState("");
  function passwordChange(event) {
    setPassword(event.target.value);
  }
  return (
    <div className="register-page">
      <h1 className="register-page__title">Register A Cat Wiki Account</h1>
      <p className="register-page__description">
        Create a new cat wiki account to start creating and editing articles, if
        you already have an account{" "}
        <a href="/login" className="register-page__link">
          click here
        </a>
      </p>

      <form
        className="register-page__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="register-page__form-group">
          <label htmlFor="register-username" className="register-page__label">
            Username
          </label>
          <input
            id="register-username"
            type="text"
            className="register-page__input"
            value={username}
            onChange={usernameChange}
            required
          />
        </div>
        <div className="register-page__form-group">
          <label htmlFor="register-password" className="register-page__label">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            className="register-page__input"
            value={password}
            onChange={passwordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="register-page__button"
          onClick={postData}
        >
          Register Your Cat Wiki Account
        </button>
      </form>
    </div>
  );
};

export default Register;
