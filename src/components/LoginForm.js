// src/components/LoginForm.js
import React from 'react';

const LoginForm = () => (
  <form className="p-3">
    <h2>Login</h2>
    <div className="mb-3">
      <label htmlFor="username" className="form-label">Username</label>
      <input type="text" className="form-control" id="username" />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" />
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
);

export default LoginForm;
