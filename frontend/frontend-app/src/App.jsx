import React, { useState, useEffect } from "react";
import { ListSandwiches } from "./components/ListSandwiches.jsx";

const url = "http://localhost:3001/api/v1";

const App = () => {
  const [sandwiches, setSandwiches] = useState([]);

  useEffect(() => {
    fetchAllSandwiches();
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

  return (
    <div>
      <ListSandwiches sandwiches={sandwiches} />
    </div>
  );
};

export default App;
