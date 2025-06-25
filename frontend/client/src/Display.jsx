import React from "react";
import axios from "axios";
import NoPage from "./reusables/NoPage";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
const Display = () => {
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
      }
    }
    getPage();
  }, [id]);
  console.log("API:", import.meta.env.VITE_API_URL);
  return (
    <>
      {data ? (
        <>
          {" "}
          <h1 id="bogos">{data.title}</h1>
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {data.content}
          </ReactMarkdown>
          <h4>Writer(s): {data.author}</h4>
        </>
      ) : (
        <>
          <NoPage />
        </>
      )}
    </>
  );
};

export default Display;
