import React from "react";

const Login = () => {
  return (
    <div>
      <form className="space-y-4">
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
