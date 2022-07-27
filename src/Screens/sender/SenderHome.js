import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';


function SenderHome() {
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
    const [OperationDetails, setOperationDetails] = useState([]);
    const [value, onChange] = useState(new Date());


    const [packages, setpackage] = useState([]);
    const [packageId, setId] = useState(null);
    const [senderNameView, setSenderNameView] = useState("");
    const [senderAddressView, setSenderAddressView] = useState("");
    const [senderContactView, setSenderContactView] = useState("");
    const [receiverNameView, setReceiverNameView] = useState("");
    const [receiverContactView, setReceiverContactView] = useState("");
    const [receiverAddressView, setReceiverAddressView] = useState("");
    const [weightView, setWeightView] = useState("");
    const [sizeView, setSizeView] = useState("");
    const [priceView, setPriceView] = useState("");
    const [typeView, setTypeView] = useState("");
    const [packageStatus, setPackageStatus] = useState("");
    const [dateCreated, setdateCreated] = useState("");
    

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
            type
        };
        console.warn(item);

        let result = await fetch("http://localhost:8080/api/package/", {
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

    async function AddPackageCalculation() {
        let item = {
           
            weight,
            size,
           
        };
        console.warn(item);

        let result = await fetch("http://localhost:8080/api/package/calculateCharge", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((response=> response.json()))
    .then(data=>{
        if (data.status == null){
            console.warn(data)
            setPrice(data);
            //success
            
        }else{
            //todo show error message
        }
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

      useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch("http://localhost:8080/api/package").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setpackage(resp);
        setId(resp[0].id);
        setSenderNameView(resp[0].senderName);
        setSenderAddressView(resp[0].senderAddress);
        setSenderContactView(resp[0].senderContact);
        setReceiverNameView(resp[0].receiverName);
        setReceiverContactView(resp[0].receiverContact);
        setReceiverAddressView(resp[0].receiverAddress);
        setWeightView(resp[0].mobile.weight);
        setSizeView(resp[0].size);
        setPriceView(resp[0].price);
        setTypeView(resp[0].type);
        setPackageStatus(resp[0].packageStatus);
        setdateCreated(resp[0].dateCreated);
      });
    });
  }


  function onClickCaculate() {

    AddPackage();
}
    function onClick() {

        AddPackage();
    }


    return (
        <>
            <div className="App">
                <h1> Add A Package</h1>

                <header className="App-header">
                    <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your Name "
                    />
                    <input
                        type="text"
                        value={senderAddress}
                        onChange={(e) => setSenderAddress(e.target.value)}
                        placeholder="Your Address"
                    />
                    <input
                        type="text"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder="Your Contact No"
                    />
                    <input
                        type="text"
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        placeholder="Reciever's Name "
                    />
                    <input
                        type="text"
                        value={receiverContact}
                        onChange={(e) => setReceiverContact(e.target.value)}
                        placeholder="Reciever's Contact No"
                    />
                    <input
                        type="text"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        placeholder="Reciever's Address"
                    />
                    <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Package Weight"
                    />

                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Package Size"
                    />
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Package Price"
                    />
                    <div> Select your nearby operational center</div>
                    <select id="myList"

                            onChange={(e) => {
                                setType(e.target.value)
                                console.error(e.target)
                            }}>
                        {OperationDetails.map((item) => (
                            <option value={[item.address, item.cityName, item.telNumber]}>
                                {" "}
                                {[item.address + ", ", item.cityName + ", ", item.telNumber]}
                            </option>
                        ))}
                    </select>
                    <div>
                        <DateTimePicker onChange={onChange} value={value}/>
                    </div>

                    <button style={{marginTop: 10}} onClick={AddPackage}>
                        Add a package
                    </button>
                    <button style={{marginTop: 10}} onClick={AddPackageCalculation}>
                        Calculate the package
                    </button>
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
              {/* <td>
                <h6>Sender Availability</h6>
              </td> */}
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
                {/* <td>
                  <h6>{item.senderAvailability}</h6>
                </td> */}
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
              
              </tr>
            ))}
          </tbody>
        </table>
                </header>
            </div>
        </>
    );
}

export default SenderHome;
