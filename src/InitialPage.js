import React from "react";
import "./styles.css";

const InitialPage = props => {
  const {
    handleParkedPlaces,
    handleSubmit,
    totalSlots,
    carsParked,
    error
  } = props;
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <ul className="flex-outer">
          <li>
            <label>Total Parking Places </label>
            <input
              name="totalSlots"
              value={totalSlots}
              placeholder="Enter Number of Parking Places"
              onChange={handleParkedPlaces}
            />
          </li>
          <li>
            <label>Cars Parked</label>
            <input
              name="carsParked"
              value={carsParked}
              placeholder="Enter Number of parked cars"
              onChange={handleParkedPlaces}
            />
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
          <li>
            {error.length ? <div className="error-message">{error}</div> : ""}
          </li>
        </ul>
      </form>
    </div>
  );
};

export default InitialPage;
