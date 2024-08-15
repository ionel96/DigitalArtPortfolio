import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Portfolio of Works</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/add-edit-work">
                  <i className="bi bi-plus-circle"></i> Add Work
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav><br></br>
    </>
  );
}

export default Header;
