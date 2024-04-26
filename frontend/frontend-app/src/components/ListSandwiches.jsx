import React from "react";
import { ListSandwich } from "./ListSandwich.jsx";

export const ListSandwiches = ({ sandwiches }) => {

  return (
    <div>
      <h2>List of Sandwiches</h2>
      <ul id="things-list">
        {sandwiches.map((sandwich) => (
          <ListSandwich
            key={sandwich._id}
            sandwich={sandwich}
          />
        ))}
      </ul>
    </div>
  );
};