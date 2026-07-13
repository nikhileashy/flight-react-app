import React from "react";
import axios from "axios";
import NavBar from "./NavBar";

const AddFlight = () => {
  const initialFormState = {
    flight_number: "",
    airline: "",
    origin: "",
    destination: "",
    departure_date: "",
    departure_time: "",
    arrival_time: "",
    fare: "",
    total_seats: "",
    available_seats: "",
    status: "Scheduled",
  };

  const [data, setData] = React.useState(initialFormState);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      ...data,
      fare: Number(data.fare),
      total_seats: Number(data.total_seats),
      available_seats: Number(data.available_seats),
    };

    axios
      .post("https://host-demo-app.onrender.com/api/add-flight", payload)
      .then((res) => {
        setSuccessMessage("Flight added successfully");
        setData(initialFormState);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Error adding flight");
        }
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container" style={{ padding: 10, margin: "50px auto" }}>
        <h1 style={{ marginBottom: 50 }}>Add Flight</h1>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger" role="alert" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="flight_number" className="form-label">
              Flight Number
            </label>
            <input
              type="text"
              name="flight_number"
              id="flight_number"
              className="form-control"
              value={data.flight_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="airline" className="form-label">
              Airline
            </label>
            <input
              type="text"
              name="airline"
              id="airline"
              className="form-control"
              value={data.airline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="origin" className="form-label">
              Origin
            </label>
            <input
              type="text"
              name="origin"
              id="origin"
              className="form-control"
              value={data.origin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="destination" className="form-label">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              id="destination"
              className="form-control"
              value={data.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="departure_date" className="form-label">
              Departure Date
            </label>
            <input
              type="date"
              name="departure_date"
              id="departure_date"
              className="form-control"
              value={data.departure_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="departure_time" className="form-label">
              Departure Time (HH:MM)
            </label>
            <input
              type="time"
              name="departure_time"
              id="departure_time"
              className="form-control"
              value={data.departure_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="arrival_time" className="form-label">
              Arrival Time (HH:MM)
            </label>
            <input
              type="time"
              name="arrival_time"
              id="arrival_time"
              className="form-control"
              value={data.arrival_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="fare" className="form-label">
              Fare
            </label>
            <input
              type="number"
              name="fare"
              id="fare"
              className="form-control"
              value={data.fare}
              onChange={handleChange}
              min="0"
              step="any"
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="total_seats" className="form-label">
              Total Seats
            </label>
            <input
              type="number"
              name="total_seats"
              id="total_seats"
              className="form-control"
              value={data.total_seats}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="available_seats" className="form-label">
              Available Seats
            </label>
            <input
              type="number"
              name="available_seats"
              id="available_seats"
              className="form-control"
              value={data.available_seats}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              value={data.status}
              onChange={handleChange}
              required
            >
              <option value="Scheduled">Scheduled</option>
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="col col-12 col-sm-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;