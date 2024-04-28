import React, { useState } from "react";
import { SandwichDetails } from "./SandwichDetails.jsx";
import Modal from "./Modal";

const url = "http://localhost:3001/api/v1";

export const ListSandwich = ({ sandwich }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSandwichClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOrderClick= async () => {
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
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderConfirmation = () => {
    if (window.confirm("Are you sure you want to place this order?")) {
      handleOrderClick();
    }
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
    </li>
  );
};
