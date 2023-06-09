import React from "react";
import { useNavigate } from "react-router-dom";
const Card = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      class="card"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={() => navigate(`/${data.trainNumber}`)}
    >
      <div class="card-body">
        <h5 class="card-title">{data.trainName}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">
          Train Number : {data.trainNumber}
        </h6>
        <p class="card-text">Seats available</p>
        <p>
          Sleeper: {data.seatsAvailable.sleeper} - price: {data.price.sleeper}
        </p>
        <p>
          AC: {data.seatsAvailable.AC}- price: {data.price.AC}
        </p>
        <p>
          Departure Time : {data.departureTime.Hours}:
          {data.departureTime.Minutes}{" "}
        </p>
        {data.delayedBy > 0 && <p>delayed by : <span style={{color:"red"}}>{data.delayedBy}mins</span></p>}
      </div>
    </div>
  );
};

export default Card;
