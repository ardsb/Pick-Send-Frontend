import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
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
            packageStatus,
            dateCreated
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


    useEffect(() => {
        async function fetchOperationDetails() {
            let result = await fetch("http://localhost:8080/api/operation-center");
            result = await result.json();
            setOperationDetails(result);
        }

        fetchOperationDetails();
    }, []);


    function onClick() {

        AddPackage();
    }


    return (
        <>
            <div className="App">
                <h1> Add A Package</h1>

                <header className="App-header">

                    <div>
                        <DateTimePicker onChange={onChange} value={value}/>
                    </div>

                    <button style={{marginTop: 10}} onClick={onClick}>
                        Add a package
                    </button>
                </header>
            </div>
        </>
    );
}

export default HomepageSender;
