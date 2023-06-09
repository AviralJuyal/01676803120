import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8080/api/train/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.train);
      });
  }, []);
  return (
    <div class="container pt-4">
      <div class="card-body">
        <h5 class="card-title">Train Name : {data?.trainName}</h5> <br />
        <h6 class="card-subtitle mb-2 text-body-secondary">
          Train Number : {data?.trainNumber}
        </h6>
        <p class="card-text">Seats available</p>
        <p>
          Sleeper: {data?.seatsAvailable?.sleeper} - price:{" "}
          {data?.price?.sleeper}
        </p>
        <p>
          AC: {data?.seatsAvailable?.AC}- price: {data?.price?.AC}
        </p>
        <p>
          Departure Time : {data?.departureTime?.Hours}:
          {data?.departureTime?.Minutes}{" "}
        </p>
        {data?.delayedBy > 0 && (
          <p>
            delayed by :{" "}
            <span style={{ color: "red" }}>{data?.delayedBy}mins</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
