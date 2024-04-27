import React from "react";
import { ListOrder } from "./ListOrder.jsx";

export const ListOrders = ({ orders }) => {

  return (
    <div>
      <h2>My Orders</h2>
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