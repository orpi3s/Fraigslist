import { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "./App";

const Register = (props) => {
  const setToken = props.setToken;
  //we need to collect username and pass
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  //console.log(usernane, password, confirm);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      //change error state with msg "wrong password"
      setError("Confirm password does not match original password.");
      return;
    }

    //send a req to the server to register
    const resp = await fetch(`${API}/users/register`, {
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
      return setError(info.error.message);
    }
    //saves token in state and local storage
    setToken(info.data.token);
    localStorage.setItem("token", info.data.token);

    //take us home and display registered msg .programtically navigate
    history.push("/");
  };
  return (
    <>
      <h1>Register:</h1>
      <form onSubmit={handleRegister}>
        <input
          required
          placeholder="Enter username.."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          placeholder="Enter password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          placeholder="Confirm password.."
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button>Register</button>
      </form>
      <p>{error}</p>
    </>
  );
};
export default Register;
