import React from "react";
import AuthLeft from "./AuthLeft";
import "./AuthPage.css";
import AuthRight from "./AuthRight";
function AuthPage({ setIsLogin }) {
  return (
    <div className="container">
      <AuthLeft />
      <AuthRight setIsLogin={setIsLogin} />
    </div>
  );
}

export default AuthPage;
