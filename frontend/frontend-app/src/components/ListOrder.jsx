import React, { useState, useEffect } from "react";
import { OrderDetails } from "./OrderDetails.jsx";
import Modal from "./Modal";

const url = "http://localhost:3001/api/v1";

export const ListOrder = ({ order }) => {
  const [sandwich, setSandwich] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSandwich(order.sandwichId);
  }, []);

  const fetchSandwich = async (id) => {
    try {
      const response = await fetch(url + "/sandwich/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setSandwich(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <li id={`thing-${order._id}`}>
      <a href="#">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{sandwich.name}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>{order.status}</div>
            &nbsp;&nbsp;
            <button className="btn-update" onClick={handleOrderClick}>
              More Details
            </button>
          </div>
        </div>
      </a>
      {showModal && (
        <Modal onClose={closeModal}>
          <OrderDetails order={order} sandwich={sandwich} onClose={closeModal} />
        </Modal>
      )}
    </li>
  );
};
