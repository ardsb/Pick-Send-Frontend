import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function HomepageSender() {

    
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);

  async function AddPackage() {
    let item = {
      senderName,
      senderAddress,
      senderContact,
      receiverName,
      receiverContact,
      receiverAddress,
      weight,
      height,
      width,
      length,
      price,
      status,
      type,
    };
    console.warn(item);

    let result = await fetch("http://localhost:8080/api/package", {
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

  useEffect( ()=> {
    async function fetchMyAPI(){
    let result = await fetch("http://localhost:8080/api/operation-center");
    result= await result.json();
    setData(result)
    }
    fetchMyAPI()
  
  },[])

  return (
    <>
      <h1> Add A Package</h1>
      
      <header className="App-header">
        <input
          type="text"
          value={""}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="Your Name "
        ></input>
        <input
          type="text"
          value={senderAddress}
          onChange={(e) => setSenderAddress(e.target.value)}
          placeholder="Your Address"
        ></input>
        <input
          type="text"
          value={senderContact}
          onChange={(e) => setSenderContact(e.target.value)}
          placeholder="Your Contact No"
        ></input>
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          placeholder="Reciever's Name "
        ></input>
        <input
          type="text"
          value={receiverContact}
          onChange={(e) => setReceiverContact(e.target.value)}
          placeholder="Reciever's Contact No"
        ></input>
        <input
          type="text"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          placeholder="Reciever's Address"
        ></input>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Package Weight"
        ></input>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Package Height"
        ></input>
        <input
          type="text"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Package WIdth"
        ></input>
        <input
          type="text"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Package Lenght"
        ></input>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Package Price"
        ></input>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        ></input>

     
       
      
       
        <select
          id="myList"
          onChange={(e) => setType(e.target.value)}
        >
         {data.map((item)=>
         
          <option value = {item.address}> {item.address} </option>
       
          
          )
       }
        </select>
        
        <button onClick={AddPackage}>Register</button>
      </header>
    </>
  );
}

export default HomepageSender;
