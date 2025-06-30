import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  async function articleFetch() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api`);
      setData(response.data);
    } catch (error) {
      console.log("error getting articles", error);
    }
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    articleFetch();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-inner">
        <h1 className="home-title">Welcome to CAT WIKI</h1>
        <p className="home-description">
          This is the home page for the cat wiki
        </p>

        <h3 className="home-subtitle">Browse</h3>
        <ul className="home-article-list">
          {data.map((article, index) => (
            <li key={index}>
              <Link to={`/page/${article._id}`} className="home-article-link">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
// <li key={index}>{article.title}</li>
