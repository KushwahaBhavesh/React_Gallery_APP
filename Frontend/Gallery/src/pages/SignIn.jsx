import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  let PORT = 5000;
  const navigate = useNavigate()

  // creating refrence of the form filed
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  const handleFormSubmit = (event) => {
    // handling default behaviour of form
    event.preventDefault();

    // geting form value
    const email = emailRef.current.value;
    const password = passwordRef.current.value;


    registerUser(email, password);
  }

  const registerUser = async (email, password, confirmPassword) => {
    try {
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`http://localhost:${PORT}/api/auth/register`, { email, password }, config);
      // varify the resopnse
      if (data && data.success) {
        toast.success(data.msg)
        setTimeout(() => {
          navigate('/login');
        }, 3000)
      }
      else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return <>

    <section className='container-fluid d-flex justify-content-center align-items-center vh-100' style={{ background: "linear-gradient(to right,#7f00ff, #e100ff)" }}>
      <div className="card d-flex justify-content-center align-items-center p-4 rounded-3" style={{ width: "28em", background: "linear-gradient(to right, #fffc00, #ffffff", boxShadow: " 0px 5px 25px 3px rgba(255, 255, 255, 1)" }}>

        <div className='col-lg-8 d-flex flex-column justify-content-center align-items-center  mt-4'>
          <form className='d-flex justify-content-center' onSubmit={handleFormSubmit}>
            <div className="row g-4 ">
              <div className='col-lg-12 text-center'>
                <h2 className='fw-bolder'>CREATE NEW ACCOUNT</h2>
              </div>

              <div className="col-lg-12 d-flex gap-2 align-items-center">
                <i className="bi bi-person-fill fs-4"></i>
                <input type="email" ref={emailRef} className="form-control border-0 border-bottom border-dark bg-transparent text-dark fw-bold" placeholder="Email" required />
              </div>
              <div className="col-lg-12 d-flex gap-2 align-items-center">
                <i className="bi bi-lock-fill fs-4" ></i>
                <input type="password" ref={passwordRef} className="form-control border-0 border-bottom border-dark bg-transparent text-dark fw-bold" placeholder="Password" />
              </div>


              <div className="col-lg-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" />
                  <label className="form-check-label fw-bold " htmlFor="gridCheck">Accept 
                    <Link to='/terms&service'> Terms & Service</Link>
                  </label>
                </div>
              </div>
              <div className="col-lg-12 text-center ">
                <button type="submit" className="btn btn-primary px-4 ">Sign in</button>
              </div>
              <div className='col-lg-12 text-center fs-6 mt-3'>
                <span className='fw-bold '>Already a member ? | <Link to="/login" className=''>Login</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </>
}

export default SignIn
