import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const fetchData = async (event) => {
    event.preventDefault();
    if (title && content && author) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}api`,
          {
            title,
            content,
            author,
          }
        );

        setData(response.data);
        window.alert("Article Created! go to home to view all articles");
      } catch (error) {
        console.log("Error Posting Data", error);
        window.alert("Article name is duplicated, or internal server error D:");
      }
    }
  };

  function titleChange(event) {
    setTitle(event.target.value);
  }
  function contentChange(event) {
    setContent(event.target.value);
  }
  function authorChange(event) {
    setAuthor(event.target.value);
  }

  return (
    <>
      <h1>Create</h1>
      <a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax">
        We support markdown! view how to use it here
      </a>
      <form>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={titleChange} required />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={contentChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Author</label>
          <input type="text" value={author} onChange={authorChange} required />
        </div>
        <button onClick={fetchData}>Submit</button>
      </form>
      <h3>{data}</h3>
    </>
  );
};

export default Create;
