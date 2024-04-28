import React from "react";
import { ListSandwich } from "./ListSandwich.jsx";

export const ListSandwiches = ({ sandwiches, onOrder }) => {

  return (
    <div>
      <h2>List of Sandwiches</h2>
      <ul id="things-list">
        {sandwiches.map((sandwich) => (
          <ListSandwich onOrder={onOrder} 
            key={sandwich._id}
            sandwich={sandwich}
          />
        ))}
      </ul>
    </div>
  );
};