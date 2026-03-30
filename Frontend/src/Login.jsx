import React from "react";
import "./AuthPage.css";
import { useState } from "react";
import { toast } from "react-toastify";
function Login({ setIsLogin, setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert("Please fill all fields");
        return;
      }

      const res = await fetch("https://dev-mind.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Invalid server response" };
      }

      console.log("Login response:", data);

      if (res.ok && data.token) {
        // ✅ store token
        localStorage.setItem("token", data.token);
        setIsLogin(true);
        toast.success("Login Successful ✅");

        // 👉 (optional) redirect later
        // navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed ❌");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="rightContainer">
      <h3>SIGN IN</h3>

      <div className="inputBox">
        <input
          type="name"
          id="name"
          className="signInput"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          id="password"
          className="signInput"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submitBtn" onClick={handleLogin}>
          Submit
        </button>
        <div className="authChecher">
          <p>Don't Have an account ? </p>
          <button className="signupLink" onClick={() => setLogin(false)}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
