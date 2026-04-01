import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
function SignUp({ setIsLogin, setLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState(<EyeOff />);

  const handleTogele = () => {
    if (inputType == "password") {
      setInputType("text");
      setIcon(<EyeOff />);
    } else {
      setInputType("password");
      setIcon(<Eye />);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!email || !username || !password) {
        alert("Please fill all fields");
        return;
      }
      const res = await fetch("https://dev-mind.onrender.com/api/auth/signup", {
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

        <div className="passBox">
          <input
            type={inputType}
            id="password"
            className="signInput"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="eyeButton"
            onClick={handleTogele}
            aria-label={
              inputType === "password" ? "Show password" : "Hide password"
            }
          >
            {icon}
          </button>
        </div>
        <button id="submitBtn" className="submitBtn " onClick={handleSignUp}>
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
