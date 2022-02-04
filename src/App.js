import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
//import "./style.css";

export const API =
  "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

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
export default App;
