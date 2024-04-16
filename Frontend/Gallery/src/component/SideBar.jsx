import React from 'react'
import LogoutBtn from '../component/logoutBtn'
import { Link } from 'react-router-dom'

const SideBar = ({ selectedTab }) => {

  

  return (
    <>
      <div

        className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary border-3 border-end"
        style={{ width: " 220px", height: "90vh" }}
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Gallery App</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" id='gallery'>
            <Link to="/gallery/dashboard" className={`nav-link ${selectedTab === 'gallery' && 'active'}`} aria-current="page">
              Gallery
            </Link>
          </li>
          <li className="nav-item" id='upload'>
            <Link to="/upload" className={`nav-link ${selectedTab === 'upload' && 'active'}`} aria-current="page">
              Upload
            </Link>
          </li>

        </ul>
        <hr />
        <LogoutBtn/>
      </div>
      <div>
      </div>

    </>
  )
}

export default SideBar
