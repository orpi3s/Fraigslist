// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

// import App from "./App";

// const app = document.getElementById("app");
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   app
// );


import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {
  Posts,
  UserPosts,
  NewPostForm,
  Navbar,
  Login,
  Profile,
} from "./App";
import { callApi } from "./App";
import "../src/style.css";
import Register from "./Register";

const App = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData,] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchUserData = async (token) => {
    const { data } = await callApi({
      url: "/users/me",
      token,
    });
    return data;
  };

  const fetchPosts = async () => {
    const {
      data: { posts },
    } = await callApi({
      url: "/posts",
    });
    return posts;
  };

  useEffect(async () => {
    // const posts = await fetchPosts();
    // setPosts(posts);
    if (!token) {
      setToken(localStorage.getItem("token"));
      return;
    }
    const data = await fetchUserData(token);
    if (data && data.username) {
      setUserData(data);
    }
  }, [token]);

  useEffect(async () => {
    const posts = await fetchPosts();
    setPosts(posts);
  }, []);

  return (
    <>
      <div id="header">
        {userData.username && (
          <p>Welcome back to Stranger's Things {userData.username}</p>
        )}
        {!userData.username && <p>Welcome to Stranger's Things</p>}
      </div>
      <Navbar token={token} />

      <Switch>
        <Route exact path="/"></Route>

        <Route exact path="/posts">
          <Posts
            posts={posts}
            token={token}
            setPosts={setPosts}
            userData={userData}
          />
        </Route>
        <Route path="/profile">
          <Profile userData={userData} token={token} />
        </Route>
        <Route path="/posts/new">
          <NewPostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action="add"
          />
        </Route>
        <Route path="/posts/:postId/edit">
          <NewPostForm
            token={token}
            setPosts={setPosts}
            posts={posts}
            action="edit"
          />
        </Route>
        <Route path="/posts/:postId">
          <UserPosts posts={posts} token={token} />
        </Route>
        <Route path="/register">
          <Register
            action="register"
            setToken={setToken}
            setUserData={setUserData}
          />
        </Route>
        <Route path="/login">
          <Login
            action="login"
            setToken={setToken}
            setUserData={setUserData}
          />
        </Route>
      </Switch>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);

