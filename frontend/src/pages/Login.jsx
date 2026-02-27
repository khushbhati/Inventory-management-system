import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "pass123") {
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
   <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">IMS Login</h2>
        <input className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={(e)=>setUser(e.target.value)} />
        <input type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e)=>setPass(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Login
        </button>
        
      </form>
    </div>
  );
}