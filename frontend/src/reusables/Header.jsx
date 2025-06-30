import React, { useEffect, useState } from "react";
import axios from "axios";
const Header = () => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}verify`, {
          withCredentials: true,
        });
        setLogged(true);
      } catch (error) {
        console.log(error);
      }
    };
    authCheck();
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <h1 className="site-logo">CAT</h1>
        <nav className="site-nav">
          <a href="/">Home</a>
          <a href="/create">Create</a>
          <a
            href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            target="_blank"
            rel="noopener noreferrer"
          >
            Markdown
          </a>
          <a href="https://forms.gle/3eq82HWEp1D4wwf28">feedback</a>
          {logged ? <></> : <a href="/login">Login</a>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
