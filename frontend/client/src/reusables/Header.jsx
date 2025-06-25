import React from "react";
import "../header.css";
const Header = () => {
  const Loggedin = localStorage.getItem("Loggedin");
  return (
    <header>
      <h1>CAT</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/create">create</a>
        <a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax">
          markdown
        </a>
        {Loggedin ? (
          <></>
        ) : (
          <>
            <a href="/login">login</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
