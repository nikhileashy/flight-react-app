import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Flight Management App</h1>
      
      <div className="d-flex justify-content-center gap-3">
        <Link to="/add" className="btn btn-primary">
          Add Flight
        </Link>
        <Link to="/view" className="btn btn-success">
          View Flights
        </Link>
      </div>
    </div>
  );
};

export default Home;