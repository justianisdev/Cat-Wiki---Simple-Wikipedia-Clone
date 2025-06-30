import React from "react";

const NoPage = () => {
  const errors = [
    "does he know about the 404",
    "what the sigma",
    "horses in the back",
    "does he know about the 404",
    "what the sigma",
    "horses in the back",
    "JuicyOrange sucks, if u see this screenshot this and ping him in general",
    "did you know you eat about 10 spiders every time i cook for you",
    "gurt: yo",
    "You got that dog in you",
  ];

  const randomIndex = Math.floor(Math.random() * errors.length);
  const randomError = errors[randomIndex];
  return (
    <div className="home-page">
      <div className="home-page-inner">
        <h1 className="home-title">This Page Doesn't Exist!</h1>
        <p className="home-description">{randomError}</p>
        <h3 className="home-subtitle">
          <a className="home-article-link" href="/">
            Go back to the homepage
          </a>
        </h3>
      </div>
    </div>
  );
};

export default NoPage;
