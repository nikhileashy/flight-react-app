import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ 
      backgroundColor: "#ffffff", 
      borderBottom: "1px solid #edf2f7",
      padding: "12px 20px"
    }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home" style={{ color: "#333", fontWeight: "600" }}>
          Flight Management App
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "1px solid #edf2f7" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#495057" }}>
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/add" style={{ color: "#495057" }}>
                Add Flight Form
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/view" style={{ color: "#495057" }}>
                View All Flights
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
