import React, { useState } from "react";

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "pass123") {
      onLogin(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-green-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input className="w-full p-2 border rounded mb-3"
          placeholder="Username"
          onChange={(e)=>setUser(e.target.value)} />

        <input type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Password"
          onChange={(e)=>setPass(e.target.value)} />

        <button onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;