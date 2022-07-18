import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';


function HomepageSender() {
  const [senderName, setSenderName] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [packageId, setpackageId] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
  const [dateCreated, setdateCreated] = useState("");
  const [OperationDetails, setOperationDetails] = useState([]);
  const [value, onChange] = useState(new Date());

  async function AddPackage() {
    let item = {
      senderName,
      senderAddress,
      senderContact,
      receiverName,
      receiverContact,
      receiverAddress,
      weight,
      size,
      price,
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


  async function PackageStatus() {
    let item = {
      packageStatus,
      dateCreated,
      packageId
    };
    console.warn(item);

    let result = await fetch("http://localhost:8080/api/package_tracks", {
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

  

  useEffect(() => {
    async function fetchOperationDetails() {
      let result = await fetch("http://localhost:8080/api/operation-center");
      result = await result.json();
      setOperationDetails(result);
    }
    fetchOperationDetails();
  }, []);

 

    
  function onClick(){
    PackageStatus();
    AddPackage();
  }
  

  return (
    <>
      <h1> Add A Package</h1>

      <header className="App-header">
        <input
          type="text"
          value={senderName}
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
          value={size}
          onChange={(e) => setSize(e.target.value)}
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
          value={packageId}
          onChange={(e) => setpackageId(e.target.value)}
          placeholder="Package ID"
        ></input>
          <input
          type="text"
          value={dateCreated}
          onChange={(e) => setdateCreated(e.target.value)}
          placeholder="Package Created Date"
        ></input>

        <div> Select your nearby operational center</div>
        <select id="myList"
        
         onChange={(e) => {
            setType(e.target.value)
            console.error(e.target)
         } }>
          {OperationDetails.map((item) => (
            <option value={[item.address, item.cityName,item.telNumber]}>
              {" "}
              {[item.address +", ",  item.cityName +", ", item.telNumber]}
            </option>
          ))}
        </select> 
   <div>
      <DateTimePicker onChange={onChange} value={value} />
    </div> 

        <button style={{ marginTop: 10 }} onClick={onClick}>
          Add a package
        </button>
      </header>
    </>
  );
}

export default HomepageSender;
