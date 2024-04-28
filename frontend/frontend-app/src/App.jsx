import React, { useState, useEffect, useRef } from "react";
import { ListSandwiches } from "./components/ListSandwiches.jsx";
import { ListOrders } from "./components/ListOrders.jsx";
import { AuthUser } from "./components/AuthUser.jsx";
import { AddSandwich } from "./components/AddSandwich.jsx";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const URL = `${ENDPOINT}/api/v1`;
const ADMIN_USER = "admin";
const CUSTOMER_USER = "customer";

const App = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loggedUserType, setLoggedUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("userType"))
  );
  const usernameRef = useRef(""); // Declare username as a ref
  const passwordRef = useRef("");

  useEffect(() => {
    if (isLoggedIn) {
      if (loggedUserType === ADMIN_USER) {
        fetchAllOrders();
      } else {
        fetchCustomerOrders(localStorage.getItem("customerId"));
      }
      fetchAllSandwiches();
    }

    const socket = socketIOClient(ENDPOINT);
    socket.on("orders_updated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    // Clean up the effect
    return () => socket.disconnect();
  }, [isLoggedIn]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(""); // Clear the error message after 3 seconds
      }, 3000);

      // Clear the timer when the component is unmounted or the error message changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType) {
      setIsLoggedIn(true);
      setLoggedUserType(userType);
    }
  }, []);

  const updateSandwichesList = (newSandwich, isDelete = false) => {
    if (isDelete) {
      setSandwiches((prevSandwiches) => {
        return prevSandwiches.filter(
          (sandwich) => sandwich._id !== newSandwich._id
        );
      });
    } else {
      setSandwiches((prevSandwiches) => {
        return [...prevSandwiches, newSandwich];
      });
    }
  };

  const updateOrdersList = (newOrder) => {
    setOrders((prevOrders) => {
      return [...prevOrders, newOrder];
    });
  };

  const fetchAllSandwiches = async () => {
    try {
      const response = await fetch(URL + "/sandwich", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setSandwiches(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(URL + "/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomerOrders = async (customerId) => {
    try {
      const response = await fetch(`${URL}/order/customer/${customerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch(URL + "/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      setErrorMessage(data.message);
      if (data.username) {
        usernameRef.current = username;
        passwordRef.current = password;

        localStorage.setItem("userType", data.userType);
        localStorage.setItem("customerId", data._id);
        setLoggedUserType(data.userType);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await response.json();
      setErrorMessage(data.message);
      if (data.username) {
        usernameRef.current = username;
        passwordRef.current = password;

        localStorage.setItem("userType", data.userType);
        localStorage.setItem("customerId", data._id);
        setLoggedUserType(data.userType);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(URL + "/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setErrorMessage(data.message);
        localStorage.removeItem("userType");
        localStorage.removeItem("customerId");
        setLoggedUserType("");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>{errorMessage}</p>
      <AuthUser
        isLoggedIn={isLoggedIn}
        onLogin={login}
        onRegister={register}
        onLogout={logout}
      />

      {isLoggedIn && loggedUserType === ADMIN_USER && (
        <div>
          <ListSandwiches
            sandwiches={sandwiches}
            onDelete={updateSandwichesList}
          />
          <AddSandwich onAddSandwich={updateSandwichesList} />
          <h2>All Orders</h2>
          <ListOrders orders={orders} />
        </div>
      )}

      {isLoggedIn && loggedUserType === CUSTOMER_USER && (
        <div>
          <ListSandwiches sandwiches={sandwiches} onOrder={updateOrdersList} />
          <h2>My Orders</h2>
          <ListOrders orders={orders} />
        </div>
      )}
    </div>
  );
};

export default App;
