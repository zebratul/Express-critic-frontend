// src/components/Header.js
import React from 'react';

const Header = () => (
  <header className="bg-primary text-white p-3">
    <h1>User Info</h1>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-light" type="submit">Search</button>
    </form>
  </header>
);

export default Header;
