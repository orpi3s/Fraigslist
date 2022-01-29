import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Register from "./Register";

export const API =
  "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  async function fetchPosts() {
    const resp = await fetch(`${API}/posts`);
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

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/posts">
        <Posts posts={posts} />
      </Route>

      <Route exact path="/register">
        <Register setToken={setToken} />
      </Route>
    </>
  );
};
export default App;
