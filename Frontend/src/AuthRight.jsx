import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

function AuthRight({ setIsLogin }) {
  const [isLogin, setLogin] = useState(true); // UI toggle

  return (
    <div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} setLogin={setLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} setLogin={setLogin} />
      )}
    </div>
  );
}

export default AuthRight;
