import React, { useState, useEffect, useRef } from "react";
import { ListSandwiches } from "./components/ListSandwiches.jsx";
import { ListOrders } from "./components/ListOrders.jsx";
import { AuthUser } from "./components/AuthUser.jsx";
import { AddSandwich } from "./components/AddSandwich.jsx";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
const URL = `${ENDPOINT}/api/v1`;

const App = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const usernameRef = useRef(""); // Declare username as a ref
  const passwordRef = useRef("");

  useEffect(() => {
    fetchAllSandwiches();
    fetchAllOrders();

    const socket = socketIOClient(ENDPOINT);
    socket.on("orders_updated", updatedOrder => {
      setOrders(prevOrders => prevOrders.map(order => 
        order._id === updatedOrder._id ? updatedOrder : order
      ));
    });

    // Clean up the effect
    return () => socket.disconnect();
  }, [isLoggedIn]);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchAllSandwiches = async () => {
    try {
      const response = await fetch(URL + "/sandwich", {
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
      const response = await fetch(URL + "/order", {
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

  const register = async (username, password) => {
    try {
      const response = await fetch(URL + "/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      usernameRef.current = data.username;
      passwordRef.current = password;
      setIsLoggedIn(true);
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
      if (data.username) {
        usernameRef.current = username;
        passwordRef.current = password;

        localStorage.setItem("userType", data.userType);
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
        localStorage.removeItem("userType");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AuthUser
        isLoggedIn={isLoggedIn}
        onLogin={login}
        onRegister={register}
        onLogout={logout}
      />

      {isLoggedIn && (
        <div>
          <ListSandwiches sandwiches={sandwiches} />
          <ListOrders orders={orders} />
          <AddSandwich />
        </div>
      )}
    </div>
  );
};

export default App;
