import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const login = () => {
  const PORT = 5000;
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // creating ref of the form
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // getting value of the form
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userDetails = { email, password };

    // Login Logic
    try {
      const config = {
        Headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        `http://localhost:${PORT}/api/auth/login`,
        userDetails,
        config
      );
      console.log(data);

      if (data && data.success) {
        toast.success(data.msg);
        
        setTimeout(() => {
          navigate("/gallery/dashboard");
          // navigate('/protectedRoute')
        }, 3000);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <section
        className="container-fluid d-flex justify-content-center align-items-center vh-100"
        style={{ background: "linear-gradient(to right,#7f00ff, #e100ff)" }}
      >
        <div
          className="card d-flex justify-content-center align-items-center p-4 rounded-3"
          style={{
            width: "20em",
            background: "linear-gradient(to right, #fffc00, #ffffff",
            boxShadow: " 0px 5px 25px 3px rgba(255, 255, 255, 1)",
          }}
        >
          <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center  mt-4">
            <form
              className="d-flex justify-content-center"
              onSubmit={handleFormSubmit}
            >
              <div className="row g-4 ">
                <div className="col-lg-12 text-center">
                  <h2 className="fw-bolder">LOG IN</h2>
                </div>

                <div className="col-lg-12 d-flex gap-2 align-items-center">
                  <i className="bi bi-person-fill fs-4"></i>
                  <input
                    type="email"
                    ref={emailRef}
                    className="form-control border-0 border-bottom border-dark bg-transparent text-dark fw-bold"
                    placeholder="Email"
                  />
                </div>
                <div className="col-lg-12 d-flex gap-2 align-items-center">
                  <i className="bi bi-lock-fill fs-4"></i>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="form-control border-0 border-bottom border-dark bg-transparent text-dark fw-bold"
                    placeholder="Password"
                  />
                </div>

                <div className="col-lg-12 text-center mt-5">
                  <button type="submit" className="btn btn-primary px-4 ">
                    LOG IN
                  </button>
                </div>
                <div className="col-lg-12 text-center fs-6 mt-3">
                  <span className="fw-bold ">
                    Have an Account ? |
                    <Link
                      to="/register"
                      className="text-decoration-none text-primary ms-1"
                    >
                      Create Account
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default login;
