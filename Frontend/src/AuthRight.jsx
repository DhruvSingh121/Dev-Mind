import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

function AuthRight({ setIsLogin }) {
  const [isLogin, setLogin] = useState(true);

  return (
    <div className="rightContainer">
      {isLogin ? (
        <Login setIsLogin={setIsLogin} setLogin={setLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} setLogin={setLogin} />
      )}
    </div>
  );
}

export default AuthRight;
