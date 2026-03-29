import React from "react";
import "./AuthPage.css";
function AuthLeft() {
  return (
    <div className="leftContainer">
      <h1 className="leftHeading">DevMind!</h1>
      <p className="leftIntro">
        DevMind is your <b className="boldTxt">intelligent AI</b> companion
        built to think, learn, and evolve with you. Powered by next-gen
        generative AI and contextual understanding, it ,transforms ideas into
        conversations, solutions, and insights in real time. Whether you're
        coding, creating, or exploring — DevMind adapts to your flow and
        amplifies your productivity like never before.
      </p>
      <button className="leftButton">Learn More</button>
    </div>
  );
}

export default AuthLeft;
