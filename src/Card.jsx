import React from "react";
import "./Card.css";

function Card({ title, image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} className="card-img" />
      <h3>{title}</h3>
    </div>
  );
}
export default Card;
