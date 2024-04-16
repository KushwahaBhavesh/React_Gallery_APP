import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const navbarLink = [
    { name: "home", to: "/" }, { name: "gallery", to: "/gallery/dashboard" }
  ];

  return (
    <>
      <div className="container-fluid sticky-top bg-light">
        <header
          className="d-flex justify-content-between align-items-center bg-light px-5 "
          style={{ height: "3.5rem", margin: "0 2% 0 6%" }}
        >
          <div className=" d-flex gap-5">
            <h4>
              <Link
                to="/"
                className="d-flex align-items-center col-lg-12  px-5 text-dark text-decoration-none"
              >
                Gallery App
              </Link>
            </h4>
          </div>
          <div className="d-flex gap-3 ">
            <nav className="navbar ">
              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 gap-3">
                {navbarLink.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="nav-link px-2 link-warning text-dark text-capitalize "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="d-flex align-items-center gap-3">
              <Link to='/login' className="text-dark"><button type="button" className="btn btn-warning rounded-0 px-4 fs-6 rounded-2 ">Login</button> </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
