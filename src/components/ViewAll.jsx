import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAll = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    origin: '',
    destination: ''
  });

  const fetchFlights = async () => {
    setLoading(true);
    setError('');
    try {
      // Build query string dynamically if filters are applied
      const queryParams = new URLSearchParams();
      if (filters.origin.trim()) queryParams.append('origin', filters.origin.trim());
      if (filters.destination.trim()) queryParams.append('destination', filters.destination.trim());

      const url = `https://host-demo-app.onrender.com/api/flights?${queryParams.toString()}`;
      const response = await axios.get(url);
      
      setFlights(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch flight data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  const handleReset = () => {
    setFilters({ origin: '', destination: '' });
    setLoading(true);
    axios.get('https://host-demo-app.onrender.com/api/flights')
      .then(response => setFlights(response.data))
      .catch(() => setError('Failed to fetch flight data.'))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>View All Flights</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div>
          <label htmlFor="origin-filter" style={{ marginRight: '5px' }}>Origin:</label>
          <input
            id="origin-filter"
            type="text"
            name="origin"
            value={filters.origin}
            onChange={handleFilterChange}
            placeholder="e.g. Kochi"
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label htmlFor="destination-filter" style={{ marginRight: '5px' }}>Destination:</label>
          <input
            id="destination-filter"
            type="text"
            name="destination"
            value={filters.destination}
            onChange={handleFilterChange}
            placeholder="e.g. Delhi"
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Filter
        </button>
        <button type="button" onClick={handleReset} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Reset
        </button>
      </form>

      {loading && <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        flights.length === 0 ? (
          <p>No flights found matching the criteria.</p>
        ) : (
          <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>Flight No</th>
                <th>Airline</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Fare</th>
                <th>Available Seats</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id || flight._id}>
                  <td style={{ fontWeight: 'bold' }}>{flight.flight_number}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.departure_date}</td>
                  <td>{flight.departure_time}</td>
                  <td>{flight.arrival_time}</td>
                  <td>₹{flight.fare}</td>
                  <td>{flight.available_seats} / {flight.total_seats}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      backgroundColor: 
                        flight.status === 'On Time' ? '#d4edda' :
                        flight.status === 'Delayed' ? '#fff3cd' :
                        flight.status === 'Cancelled' ? '#f8d7da' : '#e2e3e5',
                      color: 
                        flight.status === 'On Time' ? '#155724' :
                        flight.status === 'Delayed' ? '#856404' :
                        flight.status === 'Cancelled' ? '#721c24' : '#383d41'
                    }}>
                      {flight.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default ViewAll;