import React from "react";
import AuthLeft from "./AuthLeft";
import AuthRight from "./AuthRight";
import "./AuthPage.css";

function AuthPage({ setIsLogin }) {
  return (
    <main className="container" role="main" aria-label="DevMind authentication">
      <div className="orbRight" aria-hidden="true" />
      <div className="authWrapper">
        <AuthLeft />
        <AuthRight setIsLogin={setIsLogin} />
      </div>
    </main>
  );
}

export default AuthPage;
