/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const postStyles = css`
  padding: 20px;
`;

const PostDetailaaa = () => {
  const { id } = useParams();

  const [postInfo, setPostInfo] = useState({
    id: 0,
    title: "",
    content: "",
    create_at: "",
    update_at: "",
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    axios
      .get(`http://localhost:8000/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPostInfo(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div css={postStyles}>
      <h2>{postInfo.title}</h2>

      <p>{postInfo.content}</p>
    </div>
  );
};

export default PostDetailaaa;
