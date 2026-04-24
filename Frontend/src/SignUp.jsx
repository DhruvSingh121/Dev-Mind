import React, { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, User, Lock, ArrowRight } from "lucide-react";

function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: "", color: "" },
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f97316" },
    { label: "Good", color: "#eab308" },
    { label: "Strong", color: "#22c55e" },
  ];
  return { score, ...levels[score] };
}

function SignUp({ setIsLogin, setLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [showPw, setShowPw] = useState(false);

  const strength = getStrength(password);

  const handleToggle = () => {
    setShowPw((prev) => !prev);
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleSignUp = async () => {
    try {
      if (!email || !username || !password) {
        toast.error("Please fill all fields");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      const res = await fetch("https://dev-mind.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful 🎉");
        setIsLogin(true);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Logo mark */}
      <div className="panelLogo" aria-hidden="true">
        ✦
      </div>
      <h3>Create account</h3>
      <p className="panelSub">Join DevMind — it's free</p>

      <div className="inputBox">
        {/* Email */}
        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="signup-email">
            Email address
          </label>
          <div className="fieldWrap">
            <span className="fieldIconLeft" aria-hidden="true">
              <Mail size={15} />
            </span>
            <input
              id="signup-email"
              type="email"
              className="signInput"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Username */}
        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="signup-username">
            Username
          </label>
          <div className="fieldWrap">
            <span className="fieldIconLeft" aria-hidden="true">
              <User size={15} />
            </span>
            <input
              id="signup-username"
              type="text"
              className="signInput"
              placeholder="Choose a username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="signup-password">
            Password
          </label>
          <div className="passBox">
            <span className="fieldIconLeft" aria-hidden="true">
              <Lock size={15} />
            </span>
            <input
              id="signup-password"
              type={inputType}
              className="signInput"
              placeholder="Create a strong password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eyeButton"
              onClick={handleToggle}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Strength bar */}
          {password.length > 0 && (
            <div
              className="strengthBar"
              aria-label={`Password strength: ${strength.label}`}
            >
              <div className="strengthTrack">
                <div
                  className="strengthFill"
                  style={{
                    width: `${(strength.score / 4) * 100}%`,
                    background: strength.color,
                  }}
                />
              </div>
              <span className="strengthLabel" style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          className="submitBtn"
          onClick={handleSignUp}
          style={{ marginTop: "6px" }}
        >
          Create Account
          <ArrowRight size={16} />
        </button>

        {/* Switch to Login */}
        <div className="authChecher">
          <p>Already have an account?</p>
          <button className="signupLink" onClick={() => setLogin(true)}>
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
