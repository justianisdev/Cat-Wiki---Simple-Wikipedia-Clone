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
  ];

  const randomIndex = Math.floor(Math.random() * errors.length);
  const randomError = errors[randomIndex];
  return (
    <div>
      <h1>This Page Doesn't Exist!</h1>
      <p>{randomError}</p>
    </div>
  );
};

export default NoPage;
