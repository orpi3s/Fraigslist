import React from "react";

const Pstyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

const Pinfo = {
  color: "Black",
  backgroundColor: "LightGrey",
  padding: "10px",
  fontFamily: "Arial",
};

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <div name="Post-Page">
      <h1 style={Pstyle}>Posts</h1>
      {posts.map((post) => (
        <div style={Pinfo} key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <h3>{post.price}</h3>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default Posts;
