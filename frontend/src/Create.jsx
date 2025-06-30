import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}verify`, {
          withCredentials: true,
        });
      } catch (error) {
        navigate("/login");
      }
    };

    authCheck();
  }, [navigate]);
  const [preview, setPreview] = useState(true);
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fetchData = async (event) => {
    event.preventDefault();
    if (title && content) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}api`,
          {
            title,
            content,
          },
          {
            withCredentials: true,
          }
        );

        setData(response.data);
        window.alert("Article Created!");
        navigate("/");
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

  function previewChange(event) {
    setPreview(!preview);
  }
  return (
    <div className="create-page">
      <div className="create-page-inner">
        <h1 className="create-page-title">Create</h1>
        <a
          className="create-page-markdown-link"
          href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
        >
          We support Markdown! view how to use it here
        </a>

        <form className="create-page-form" onSubmit={fetchData}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="text-input"
              type="text"
              value={title}
              onChange={titleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="text-input-content">Content</label>
            <textarea
              id="text-input-content"
              className="text-input"
              value={content}
              onChange={contentChange}
              required
            ></textarea>
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
        {preview ? (
          <button className="submit-button" onClick={previewChange}>
            Hide Preview
          </button>
        ) : (
          <button className="submit-button" onClick={previewChange}>
            Show Preview
          </button>
        )}
        {preview ? <ReactMarkdown>{content}</ReactMarkdown> : <></>}
        {data && <h3 className="submit-feedback">{data}</h3>}
      </div>
    </div>
  );
};

export default Create;
