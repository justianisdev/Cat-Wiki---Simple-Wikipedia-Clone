import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const Navigate = useNavigate();
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
        {
          username: username,
          password: password,
        }
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
    <>
      <h1>Login</h1>
      <p>
        log in to create and edit articles. If you don't have an account{" "}
        <a href="/register">click here</a>
      </p>

      <form>
        <div>
          <label>Username </label>
          <input type="text" value={username} onChange={usernameChange} />
        </div>
        <div>
          <label>Password </label>
          <input type="password" value={password} onChange={passwordChange} />
        </div>
        <button onClick={postLogin}>Log in</button>
      </form>
    </>
  );
};

export default Login;
