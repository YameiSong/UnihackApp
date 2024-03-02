import React from "react";

const Register = () => {
  return (
    <div>
      <form className="space-y-4">
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
