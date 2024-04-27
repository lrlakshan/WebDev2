import React from "react";

export const OrderDetails = ({ order, sandwich, onClose }) => {
return (
    <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>{sandwich.name} - </h2>
            <h2 style={{ marginLeft: "10px" }}>{order.status}</h2>
        </div>

        <h2>Order Details</h2>
        <div>
            <h3>Bread Type : {sandwich.breadType}</h3>
            <h3>Toppings : </h3>
            {sandwich.toppings.map((topping) => (
                <p key={topping._id}>{topping.name}</p>
            ))}
        </div>
        <div>
            <button className="btn-update" onClick={onClose}>
                Close
            </button>
        </div>
    </div>
);
};
