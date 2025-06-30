import React from "react";
import axios from "axios";
import NoPage from "./reusables/NoPage";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
const Display = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    async function getPage() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/article/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
        Navigate("/404");
      }
    }
    getPage();
  }, [id, Navigate]);
  return (
    <div className="display-page">
      {data && (
        <div className="display-page-inner">
          <div className="display-page-title">
            <h1>{data.title}</h1>
          </div>
          <div className="display-page-content">
            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
              {data.content}
            </ReactMarkdown>
          </div>
          <div className="display-page-author">
            <h4>Writer(s): {data.author?.username}</h4>
            <h4>Editor(s): {data?.editors}</h4>
            <h4>Uploaded at {data.uploadDate}</h4>
            <a href={`/edit/${id}`}>edit this page</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
