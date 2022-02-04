//navbar renders links

import { Link } from "react-router-dom";

const Navbar = ({ user, setToken, setUser }) => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/register">Register</Link>
      <Link
        to="/"
        onClick={() => {
          //logged in: token in local storage and state
          setToken("");
          setUser(null);
          localStorage.removeItem("token");
        }}
      >
        log out
      </Link>
      <Link to="/Login">Log in</Link>
      {/*I only want a welcome mesg if a user is logged in.
      if user exists*/}
      {user && <span>Welcome {user.username}</span>}
    </>
  );
};

export default Navbar;
console.log(false && "test");
