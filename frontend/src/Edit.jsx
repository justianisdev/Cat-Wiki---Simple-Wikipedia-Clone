import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
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

    const getArticle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/article/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArticle();
    authCheck();
  }, [navigate, id]);

  const patchData = async (event) => {
    event.preventDefault();

    if (content.length < 1) {
      window.alert("You actually have to type something believe it or not.");
      return;
    }
    try {
      axios.patch(
        `${import.meta.env.VITE_API_URL}api/article/edit/${id}`,
        {
          content,
          id,
        },
        {
          withCredentials: true,
        }
      );
      window.alert("article updated sucessfully");
      navigate(`/page/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState("");
  const [content, setContent] = useState("");

  function changeText(event) {
    setContent(event.target.value);
  }

  return (
    <div className="create-page">
      <div className="create-page-inner">
        <h1 className="create-page-title">Edit</h1>
        <h2>
          Edit page for: <strong>{data.title}</strong>{" "}
        </h2>
        <form className="create-page-form">
          <div className="form-group">
            <label htmlFor="edit-content">Content</label>
            <textarea
              value={content}
              onChange={changeText}
              id="edit-content"
              className="text-input"
              required
            />
          </div>

          <button className="submit-button" type="submit" onClick={patchData}>
            Submit
          </button>
        </form>

        <h3>
          paste the original article text below into the edit box if you want to
          start from the last saved page (recommended)
        </h3>
        <p>{data.content}</p>
      </div>
    </div>
  );
};

export default Edit;
