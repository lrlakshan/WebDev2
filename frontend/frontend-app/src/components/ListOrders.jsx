import React from "react";
import { ListOrder } from "./ListOrder.jsx";

export const ListOrders = ({ orders }) => {

  return (
    <div>
      <ul id="things-list">
        {orders.map((order) => (
          <ListOrder
            key={order._id}
            order={order}
          />
        ))}
      </ul>
    </div>
  );
};