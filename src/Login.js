import { BrowserRouter, Route, Link } from "react-router-dom";
import { useState } from "react";
import Register from "./Register";
///import "./style.css";
//import { API } from "./App";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkLogin, setCheckLogin] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
  };
  //work on handling

  return (
    <div id="container">
      <div id="navbar">Login:</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <p>Create an account</p>
      {
        <>
          <Link to="/Register">Register Here</Link>
        </>
      }
      <p>{checkLogin}</p>
    </div>
  );
};
export default Login;
