import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

function AdminPage() {
  const [cityName, setCityName] = useState("");
  const [address, setAddress] = useState("");
  const [telNumber, setTelnumber] = useState("");

  const [packages, setpackage] = useState([]);
  const [packageId, setId] = useState(null);
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
  const [packageStatus, setPackageStatus] = useState("");
  const [dateCreated, setdateCreated] = useState("");

  const [value, onChange] = useState(new Date());

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch("http://localhost:8080/api/package").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setpackage(resp);
        setId(resp[0].id);
        setSenderName(resp[0].senderName);
        setSenderAddress(resp[0].senderAddress);
        setSenderContact(resp[0].senderContact);
        setReceiverName(resp[0].receiverName);
        setReceiverContact(resp[0].receiverContact);
        setReceiverAddress(resp[0].receiverAddress);
        setWeight(resp[0].mobile.weight);
        setSize(resp[0].size);
        setPrice(resp[0].price);
        setType(resp[0].type);
        setPackageStatus(resp[0].packageStatus);
        setdateCreated(resp[0].dateCreated);
      });
    });
  }

  async function addOperationCenter() {
    //making into Object
    let item = { cityName, address, telNumber };
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

  // function getUsers() {
  //   fetch("http://localhost:8080/api/package").then((result) => {
  //     result.json().then((resp) => {
  //       // console.warn(resp)
  //       setUser(resp)
  //       setName(resp[0].senderName)
  //       setMobile(resp[0].receiverName)
  //       setEmail(resp[0].email)
  //       setUserId(resp[0].id)
  //     })
  //   })
  // }

  // function deleteUser(id) {
  //   fetch(`http://localhost:8080/api/package${id}`, {
  //     method: 'DELETE'
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp)
  //       getUsers()
  //     })
  //   })
  // }
  function selectUser(id) {
    let item = packages[id - 1];
    setPackageStatus(item.packageStatus);
    setId(item.id)
  }
  function updateUser() {
    let item = {
      dateCreated,
      packageId,
      packageStatus,
      price,
      receiverAddress,
      receiverContact,
      receiverName,
      senderAddress,
      
      senderContact,
      senderName,
      size,
      type,
      weight
     
    };
    console.warn("item", item);
    fetch(`http://localhost:8080/api/package/${packageId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUsers();
      });
    });
  }

  return (
    <div className="App">
      <h1> Admin Panel</h1>
      <header className="App-header">
        <h4> Add A New Operation Center</h4>
        <table border="2" style={{ float: "left" }}>
          <tbody>
            <tr>
              <td>
                <h6>ID</h6>
              </td>
              <td>
                <h6>Sender Name</h6>
              </td>
              <td>
                <h6>Sender Contact</h6>
              </td>
              <td>
                <h6>Sender Availability</h6>
              </td>
              <td>
                <h6>Receiver Name</h6>
              </td>
              <td>
                <h6>Receiver Contact</h6>
              </td>
              <td>
                <h6>Receiver Address</h6>
              </td>
              <td>
                <h6>Weight</h6>
              </td>
              <td>
                <h6>Size</h6>
              </td>
              <td>
                <h6>Price</h6>
              </td>
              <td>
                <h6>Type</h6>
              </td>
              <td>
                <h6>Package Status</h6>
              </td>
              <td>
                <h6>Date Created</h6>
              </td>
            </tr>
            {packages.map((item, i) => (
              <tr key={i}>
                <td>
                  <h6>{item.id}</h6>
                </td>
                <td>
                  <h6> {item.senderName}</h6>
                </td>
                <td>
                  <h6>{item.senderContact}</h6>
                </td>
                <td>
                  <h6>{item.senderAvailability}</h6>
                </td>
                <td>
                  <h6>{item.receiverName}</h6>
                </td>
                <td>
                  <h6>{item.receiverContact}</h6>
                </td>
                <td>
                  <h6>{item.receiverAddress}</h6>
                </td>
                <td>
                  <h6>{item.weight}</h6>
                </td>
                <td>
                  <h6>{item.size}</h6>
                </td>
                <td>
                  <h6>{item.price}</h6>
                </td>
                <td>
                  <h6>{item.type}</h6>
                </td>
                <td>
                  <h6>{item.packageStatus}</h6>
                </td>
                <td>
                  <h6>{item.dateCreated}</h6>
                </td>
                <td>
                  <button onClick={() => item.id}>Delete</button>
                </td>
                <td>
                  <button onClick={() => selectUser(item.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

        <input
          type="text"
          value={telNumber}
          onChange={(e) => setTelnumber(e.target.value)}
          placeholder="Enter Telephone Number"
        ></input>
        <div>
          <input
            type="text"
            value={packageStatus}
            onChange={(e) => {
              setPackageStatus(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <button onClick={updateUser}>Update User</button>
        </div>
        {/* {PackageTrackDetails.map((item) => (
          <input
          type="text"
          value={[item.packageStatus,item.packageId,item.dateCreated]}
          onChange={(e) => setPackageTrackDetails(e.target.value)}
          placeholder="Package Satus"
        ></input>
         ))} */}

        <button onClick={addOperationCenter}>Add Operation Center</button>
      </header>
    </div>
  );
}

export default AdminPage;
