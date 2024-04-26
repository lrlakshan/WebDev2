import React, { useState } from "react";
import { SandwichDetails } from "./SandwichDetails.jsx";
import Modal from "./Modal";

export const ListSandwich = ({ sandwich }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSandwichClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
            <button className="btn-update">Order</button>
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
