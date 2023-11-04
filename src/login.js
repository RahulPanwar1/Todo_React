import React, { useState } from "react";
import "./Auth.css"; // Import the CSS
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Here, you can add logic to check if the username and password match any stored accounts in local storage.
    // For simplicity, I'm using a hardcoded username and password.
    if (username === "exampleUser" && password === "examplePassword") {
      onLogin(username);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
