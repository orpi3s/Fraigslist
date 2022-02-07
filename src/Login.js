
import { useState } from "react";
import { useHistory } from "react-router-dom";
///import "./style.css";
import { BASE_URL } from "./App";

const Login = (props) => {
  const setToken = props.setToken;
  //we need to collect username and pass
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [confirm, setConfirm] = useState("");
  const [error, checkLogin] = useState("");

  const history = useHistory();

  //console.log(usernane, password, confirm);

  const handleLogin = async (e) => {
    e.preventDefault();
    checkLogin("");
    if (password === password && username === username) {
      //change error state with msg "wrong password"
      checkLogin("Username or Password is Incorrect");
      return;
    }
    const handleLogin = (event) => {
      event.preventDefault();
      setUsername("");
      setPassword("");
    };
    
    //send a req to the server to Login
    const resp = await fetch(`${BASE_URL}/users/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    //convert resp to json
    const info = await resp.json();
    console.log(info);
    //display error message under form
    //only set error if error exists
    if (info.error) {
      return checkLogin(info.error.message);
    }
    //saves token in state and local storage
    setToken(info.data.token);
    localStorage.setItem("token", info.data.token);

    //take us home and display Logined msg .programtically navigate
    setUsername("");
    setPassword("");
    history.push("/profile");
  };

  return (
    <div id="container">
      <div id="navbar">Login:</div>
      <form onSubmit={handleLogin}>
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

      <p>Don't have an account?</p>
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
