import React, { useState } from "react";

const url = "http://localhost:3001/api/v1";

export const AddSandwich = ({onAddSandwich}) => {
  const [newSandwich, setNewSandwich] = useState({ toppings: [] });
  const [newTopping, setNewTopping] = useState("");

  const handleInputChange = (event) => {
    setNewSandwich({
      ...newSandwich,
      [event.target.name]: event.target.value,
    });
  };

  const handleToppingChange = (event) => {
    setNewTopping(event.target.value);
  };

  const handleAddTopping = () => {
    setNewSandwich({
      ...newSandwich,
      toppings: [...newSandwich.toppings, { name: newTopping }],
    });
    setNewTopping("");
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(url + "/sandwich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSandwich),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setNewSandwich({ toppings: [] });
      setNewTopping("");

      onAddSandwich(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width:"50%"}}>
      <h2>Add Sandwich</h2>
      <form id="submit-thing" onSubmit={handleSubmitForm}>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          name="name"
          value={newSandwich.name || ""}
          onChange={handleInputChange}
          placeholder="Enter Sandwich Name"
        />
        <label htmlFor="type"></label>
        <input
          type="text"
          id="type"
          name="breadType"
          value={newSandwich.breadType || ""}
          onChange={handleInputChange}
          placeholder="Enter Bread Type"
        />
        <div>
          <label htmlFor="topping"></label>
          <input
            type="text"
            id="topping"
            value={newTopping}
            onChange={handleToppingChange}
            placeholder="Enter Topping"
          />
          <button type="button" className="btn-add" onClick={handleAddTopping}>
            Add Topping
          </button>
        </div>
        <ul>
          {newSandwich.toppings.map((topping, index) => (
            <li key={index}>{topping.name}</li>
          ))}
        </ul>
        <button type="submit" className="btn-add">
          Add Sandwich
        </button>
      </form>
    </div>
  );
};
