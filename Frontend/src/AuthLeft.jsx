import React from "react";
import "./AuthPage.css";

function AuthLeft() {
  return (
    <div className="leftContainer">
      {/* Live badge */}
      <div className="liveBadge">
        <span className="liveDot" aria-hidden="true" />
        AI-Powered Platform
      </div>

      {/* Heading */}
      <h1 className="leftHeading">
        Think deeper
        <br />
        with <span className="boldTxt">DevMind</span>
      </h1>

      {/* Description */}
      <p className="leftIntro">
        DevMind is your <b className="boldTxt">intelligent AI</b> companion
        built to think, learn, and evolve with you. Powered by next-gen
        generative AI and contextual understanding, it transforms ideas into
        conversations, solutions, and insights in real time. Whether you're
        coding, creating, or exploring — DevMind adapts to your flow and
        amplifies your productivity like never before.
      </p>

      {/* Feature list */}
      <ul className="featureList" aria-label="Key features">
        <li className="featureItem">
          <span className="featureIcon" aria-hidden="true">
            ⚡
          </span>
          Real-time contextual understanding
        </li>
        <li className="featureItem">
          <span className="featureIcon" aria-hidden="true">
            🧠
          </span>
          Next-gen generative AI reasoning
        </li>
        <li className="featureItem">
          <span className="featureIcon" aria-hidden="true">
            🔒
          </span>
          Enterprise-grade security &amp; privacy
        </li>
        <li className="featureItem">
          <span className="featureIcon" aria-hidden="true">
            🚀
          </span>
          Amplify your productivity instantly
        </li>
      </ul>

      {/* Trust signals */}
      <div className="trustRow" aria-label="Trust signals">
        <span>No credit card required</span>
        <span className="trustDivider" aria-hidden="true" />
        <span>Free tier available</span>
        <span className="trustDivider" aria-hidden="true" />
        <span>Cancel anytime</span>
      </div>

      {/* CTA */}
      <button className="leftButton" aria-label="Learn more about DevMind">
        Learn More
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default AuthLeft;
