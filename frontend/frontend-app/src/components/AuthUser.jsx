import React, { useState, useEffect } from "react";

export const AuthUser = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const [isAuthLinkVisible, setIsAuthLinkVisible] = useState(!isLoggedIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const authLinkText = isLoginFormVisible ? "Go to register" : "Go to login";
  const authButtonLabel = isLoginFormVisible ? "Login" : "Register";
 
  const toggleAuthState = () => {
    setIsLoginFormVisible((prevIsLoginFormVisible) => !prevIsLoginFormVisible);
    setIsRegisterFormVisible(
      (prevIsRegisterFormVisible) => !prevIsRegisterFormVisible
    );
  };
 
  const submitForm = (event) => {
    event.preventDefault();
 
    if (isLoginFormVisible) {
      onLogin(username, password);
    } else {
      onRegister(username, password);
    }
 
    setUsername("");
    setPassword("");
  };
 
  const handleLogout = () => {
    setIsAuthLinkVisible(true);
    setIsLoginFormVisible(true);
    setIsRegisterFormVisible(false);
    onLogout();
  };
 
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoginFormVisible(false);
      setIsRegisterFormVisible(false);
      setIsAuthLinkVisible(false);
    }
  }, [isLoggedIn]);
 
  return (
    <div>
      {isLoggedIn ? (
        <h3>Logged In</h3>
      ) : isLoginFormVisible ? (
        <h3>Login</h3>
      ) : (
        <h3>Register</h3>
      )}
      {isAuthLinkVisible && (
        <a onClick={toggleAuthState} role="link">
          {authLinkText}
        </a>
      )}
      {!isAuthLinkVisible && <a onClick={handleLogout}>Logout</a>}
 
      {(isLoginFormVisible || isRegisterFormVisible) && (
        <form id="auth-form" onSubmit={submitForm}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="auth-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
 
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
 
          <button className="btn-auth" type="submit">
            {authButtonLabel}
          </button>
        </form>
      )}
    </div>
  );
};
