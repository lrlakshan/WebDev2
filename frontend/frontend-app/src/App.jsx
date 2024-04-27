import React, { useState, useEffect } from "react";
import { ListSandwiches } from "./components/ListSandwiches.jsx";
import { ListOrders } from "./components/ListOrders.jsx";

const url = "http://localhost:3001/api/v1";

const App = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllSandwiches();
    fetchAllOrders();
  }, []);

  const fetchAllSandwiches = async () => {
    try {
      const response = await fetch(url + "/sandwich", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSandwiches(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(url + "/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ListSandwiches sandwiches={sandwiches} />
      <ListOrders orders={orders} />
    </div>
  );
};

export default App;
