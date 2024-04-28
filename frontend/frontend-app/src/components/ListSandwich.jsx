import React, { useState } from "react";
import { SandwichDetails } from "./SandwichDetails.jsx";
import Modal from "./Modal";
import OrderConfirmation from "./OrderConfirmation.jsx";
import SandwichDeleteConfirmation from "./SandwichDeleteConfirmation.jsx";

const url = "http://localhost:3001/api/v1";

export const ListSandwich = ({ sandwich, onOrder, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const closeDeleteModal = () => { 
    setShowDeleteModal(false);
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

  const handleDeleteClick= async (id) => {
    try {
      const response = await fetch(url + `/sandwich/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json().then(() => onDelete(id, true));

    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderConfirmation = (e) => {
    e.preventDefault();
    setShowOrderModal(true);
  };

  const handleSandwichDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
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
            {(localStorage.getItem("userType") === "admin") && <button className="btn-delete" onClick={handleSandwichDelete}>Delete</button>}
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
      {showDeleteModal && (
        <Modal onClose={closeModal}>
          <SandwichDeleteConfirmation sandwich={sandwich} handleDelete={handleDeleteClick} onClose={closeDeleteModal} />
        </Modal>
      )}
    </li>
  );
};
