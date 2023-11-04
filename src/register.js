import React, { useState } from "react";
import "./Auth.css"; // Import the CSS
export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Here, you can add logic to store the new user account in local storage.
    // For simplicity, I'm just showing an alert message.
    // You should add proper error handling and validation.
    alert("Account created successfully");
    onRegister(username, password);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
