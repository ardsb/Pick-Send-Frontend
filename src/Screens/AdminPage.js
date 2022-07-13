import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminPage() {
  const [cityName, setCityName] = useState("");
  const [address, setAddress] = useState("");

  async function addOperationCenter() {
    //making into Object
    let item = { cityName, address };
    console.warn(item);

    let result = await fetch("http://localhost:8080/api/operation-center", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.JSON;
    console.warn("response", result);
  }

  return (
    <div className="App">
      <h1> Admin Panel</h1>
      <header className="App-header">
        <h3> Add A New Operation Center</h3>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter City Name"
        ></input>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
        ></input>

        <button onClick={addOperationCenter}>Add Operation Center</button>
      </header>
    </div>
  );
}

export default AdminPage;
