import React, { useState } from "react";
import { SandwichDetails } from "./SandwichDetails.jsx";
import Modal from "./Modal";
import OrderConfirmation from "./OrderConfirmation.jsx";

const url = "http://localhost:3001/api/v1";

export const ListSandwich = ({ sandwich, onOrder }) => {
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleSandwichClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleOrderClick= async (sandwich) => {
    try {
      const response = await fetch(url + "/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          sandwichId: sandwich._id,
          customerId: localStorage.getItem("customerId"),
          status: 'ordered',
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onOrder(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderConfirmation = (e) => {
    e.preventDefault();
    setShowOrderModal(true);
  };

  return (
    <li id={`thing-${sandwich._id}`}>
      <a href="#">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div> {sandwich.name}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="btn-update" onClick={handleSandwichClick}>
              More Details
            </button>
            &nbsp;&nbsp;
            {(localStorage.getItem("userType") === "customer") && <button className="btn-update" onClick={handleOrderConfirmation}>Order</button>}
          </div>
        </div>
      </a>
      {showModal && (
        <Modal onClose={closeModal}>
          <SandwichDetails sandwich={sandwich} onClose={closeModal} />
        </Modal>
      )}
      {showOrderModal && (
        <Modal onClose={closeModal}>
          <OrderConfirmation sandwich={sandwich} handleOrder={handleOrderClick} onClose={closeOrderModal} />
        </Modal>
      )}
    </li>
  );
};
