import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities }) => {
  console.log("cities?", cities);
  return (
    <div className="weather-button">
      <Button variant="warning">Current Location</Button>

      {cities.map((item) => (
        <Button variant="warning">{item}</Button>
      ))}
    </div>
  );
};

export default WeatherButton;
