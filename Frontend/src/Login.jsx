import React, { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";

function Login({ setIsLogin, setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setShowPw((prev) => !prev);
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://dev-mind.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Login response:", data); // debug

      if (res.ok) {
        // Save whatever token field the backend returns
        const token =
          data.token ||
          data.accessToken ||
          data.access_token ||
          "authenticated";
        localStorage.setItem("token", token);
        toast.success("Welcome back to DevMind! 🎉");
        setIsLogin(true); // App-level — switches to chat view
      } else {
        toast.error(
          data.message || data.error || "Login failed. Check your credentials.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="panelLogo" aria-hidden="true">
        ✦
      </div>
      <h3>Welcome back</h3>
      <p className="panelSub">Sign in to your DevMind account</p>

      <div className="inputBox">
        {/* Email */}
        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="login-email">
            Email address
          </label>
          <div className="fieldWrap">
            <span className="fieldIconLeft" aria-hidden="true">
              <User size={15} />
            </span>
            <input
              id="login-email"
              type="email"
              className="signInput"
              placeholder="Username"
              autoComplete="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
        </div>

        {/* Password */}
        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="login-password">
            Password
          </label>
          <div className="passBox">
            <span className="fieldIconLeft" aria-hidden="true">
              <Lock size={15} />
            </span>
            <input
              id="login-password"
              type={inputType}
              className="signInput"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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
        </div>

        <a className="forgotLink" href="#" tabIndex={0}>
          Forgot password?
        </a>

        {/* Submit */}
        <button className="submitBtn" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Continue"}
          {!loading && <ArrowRight size={16} />}
        </button>

        {/* Switch to Sign Up */}
        <div className="authChecher">
          <p>Don't have an account?</p>
          <button className="signupLink" onClick={() => setLogin(false)}>
            Sign up free
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
