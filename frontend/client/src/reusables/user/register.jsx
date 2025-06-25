import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState("");
  const Navigate = useNavigate();
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
        {
          username: username,
          password: password,
        }
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
    <>
      <h1>Register</h1>
      <p>
        create a new cat wiki account to start creating and editing articles, if
        you already have an account <a href="/login">click here</a>
      </p>

      <form>
        <div>
          <label>Username </label>
          <input
            type="text"
            value={username}
            onChange={usernameChange}
            required
          />
        </div>
        <div>
          <label>Password </label>
          <input
            type="password"
            value={password}
            onChange={passwordChange}
            required
          />
        </div>
        <button onClick={postData}>Register Your Cat Wiki Account</button>
      </form>
    </>
  );
};

export default Register;
