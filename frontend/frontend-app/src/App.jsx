import React, { useState, useEffect, useRef } from "react";
import { ListSandwiches } from "./components/ListSandwiches.jsx";
import { ListOrders } from "./components/ListOrders.jsx";
import {AuthUser} from "./components/AuthUser.jsx";
const url = "http://localhost:3001/api/v1";

const App = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const usernameRef = useRef(''); // Declare username as a ref
  const passwordRef = useRef('');

  useEffect(() => {
    fetchAllSandwiches();
    fetchAllOrders();
  }, [isLoggedIn]);

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

  const register = async (username, password) => {
    try {
   
      // Make an API request to register a new user
      const response = await fetch(url + '/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      

      // Assign extracted values to refs
      usernameRef.current = data.username;
      passwordRef.current = password;
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      
    }
  };

  
  const login = async (username, password) => {
    try {
      // Make an API request to fetch players with credentials for login
      const response = await fetch(url + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.message == 'User does not exist' || data.message == 'Incorrect password') {
        setIsLoggedIn(false);
      } else{
        usernameRef.current = username;
        passwordRef.current = password;
       
        setIsLoggedIn(true);
      }
      
    } catch (error) {
      console.error(error);
    }
  };


  const logout = () => {
    // Reset app state on logout
    setIsLoggedIn(false);
    // setPlayers([]);
    // setSelectedPlayer(null);
  };

  return (
    <div>
      <AuthUser isLoggedIn={isLoggedIn} onLogin={login} onRegister={register} onLogout={logout}/>
      
      {isLoggedIn && (
        <div>
          <ListSandwiches sandwiches={sandwiches} />
      <ListOrders orders={orders} />
        </div>
      )}
    </div>
  );
};

export default App;
