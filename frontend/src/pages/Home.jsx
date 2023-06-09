import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [trainsDetails, setTrainsDetails] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/train")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrainsDetails(data.trainsData);
      });
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "#454545" }}>
      <div className="container p-4">
        <h3 style={{ color: "white" }}>All trains</h3>
        <div className="d-flex" style={{ flexWrap: "wrap" }}>
          {trainsDetails.map((e) => (
            <div className="p-2">
              <Card data={e} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
