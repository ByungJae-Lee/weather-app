import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = () => {
  return (
    <div className="weather-button">
      <Button variant="warning">Current Location</Button>
      <Button variant="warning">Germany</Button>
      <Button variant="warning">Japan</Button>
    </div>
  );
};

export default WeatherButton;
