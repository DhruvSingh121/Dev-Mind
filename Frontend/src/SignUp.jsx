import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
function SignUp({ setIsLogin, setLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      if (!email || !username || !password) {
        alert("Please fill all fields");
        return;
      }
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful 🎉");
        setIsLogin(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="rightContainer">
      <h3>SIGN UP</h3>

      <div className="inputBox">
        <input
          type="email"
          id="email"
          className="signInput"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <button className="submitBtn" onClick={handleSignUp}>
          Submit
        </button>
        <div className="authChecher">
          <p>Already Have an Account ? </p>
          <button className="signupLink" onClick={() => setLogin(true)}>
            Sign IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
