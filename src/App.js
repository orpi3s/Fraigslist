import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";;
//import "./style.css";
//use the puppybowl stuff
export const API = "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";
export const BASE_URL = "https://strangers-things.herokuapp.com/api/";
export const COHORT_NAME = "2110-ftb-et-web-pt";
export const API_URL = BASE_URL + COHORT_NAME;

export const callApi = async ({ url, method, token, body }) => {
  console.log("callApi: ", { url, method, token, body });
  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Call API Request URL: ", API_URL + url);
    console.log("Call API Options: ", options);
    const response = await fetch(API_URL + url, options);
    const data = await response.json();
    console.log("data: ", data);
    if (data.error) throw data.error;
    return data;
  } catch (error) {
    console.error("ERROR: ", error);
  }
};


const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function fetchPosts() {
    const resp = await fetch(`${API}/Posts`);
    const info = await resp.json();
    setPosts(info.data.posts);
  }

  //console.log(user);

  //how do i get my state token back on page refresh from the localstorage token
  //console.log(token);+

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
    }

    const resp = await fetch(`${API}/users/me`, {
      headers: {
        Authorization: `Bearer ${lsToken}`,
      },
    });

    const info = await resp.json();
    //store all user info in state
    if (info.success) {
      setUser(info.data);
    }
  };

  // use for testing when needed console.log(info);

  //fetch posts when app first runs
  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [token]);

  return (
    <>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <div id="main-parts">
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/Posts">
          <Posts setPosts={setPosts} posts={posts} />
        </Route>

        <Route exact path="/Register">
          <Register
            token={token}
            setToken={setToken}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirm={confirm}
            setConfirm={setConfirm}
          />
        </Route>
        <Route exact path="/Login">
          <Login
            setToken={setToken}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirm={confirm}
            setConfirm={setConfirm}
          />
        </Route>
      </div>
    </>
  );
};

//move to index if possible if not leave here 
export default App;
export { default as Posts } from "./Posts";
export { default as UserPosts } from "./UserPosts";
export { default as NewPostForm } from "./NewPostForm";
export { default as Navbar } from "./Navbar";
export { default as Login } from "./Login";
export { default as Profile } from "./Profile";

