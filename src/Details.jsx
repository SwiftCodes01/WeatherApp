import React from "react";

function Details({ text, value, img, degree, unit }) {
  return (
    <div className="weather-details">
      <p>{text}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span>
          {value}
          <sup>{degree}</sup>
          <span>{unit}</span>
        </span>
        <img src={img} alt={text} width="10" />
      </div>
    </div>
  );
}

export default Details;
