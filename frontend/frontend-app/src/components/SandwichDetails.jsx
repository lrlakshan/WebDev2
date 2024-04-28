import React from "react";

export const SandwichDetails = ({ sandwich, onClose }) => {
  return (
    <div>
      <h2>{sandwich.name}</h2>
      <h3>Bread Type - {sandwich.breadType}</h3>
      {sandwich.toppings.map((topping) => (
        <p key={topping._id}>{topping.name}</p>
      ))}
      <div>
        <button className="btn-update" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
