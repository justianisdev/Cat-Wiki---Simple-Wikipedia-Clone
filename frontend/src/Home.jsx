import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// this is the home page for the wiki

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
    <>
      <h1>Welcome to CAT WIKI</h1>
      <p>This is the home page for the cat wiki</p>
      <h3>browse</h3>
      <ul>
        {data.map((article, index) => (
          <li key={index}>
            <Link to={`/page/${article._id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
// <li key={index}>{article.title}</li>
