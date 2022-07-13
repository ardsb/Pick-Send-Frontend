import React , { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {

  const[firstName,setFName]=useState("")
  const[lastName,setLName]=useState("")
  const[emailId,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[userRole,setUserRole]=useState("")


  async function register(){

    //making into Object
    let item={firstName,lastName,emailId,password,userRole}
    console.warn(item)
    

    let result = await fetch("http://localhost:8080/api/user",{
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json',
        "Accept":'application/json'
      }
    })
    
    result = await result.JSON
    console.warn("response",result)
  }

  return (
    <div className="App">
    <h1> Register Page</h1>
      <header className="App-header">
       <input type="text" value={firstName} onChange={(e)=>setFName(e.target.value)} placeholder="First Name"></input>
       <input type="text" value={lastName} onChange={(e)=>setLName(e.target.value)} placeholder="Last Name"></input>

       <input type="text" value={emailId} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>

       <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
       {/* <input type="text" value={userRole} onChange={(e)=>setUserRole(e.target.value)} placeholder="UserRole"></input> */}

  
       <select id = "myList" value={userRole} onChange={(e)=>setUserRole(e.target.value)}  >  
<option> SENDER </option>  
<option> RECIEVER </option>  
<option> RIDER </option>  
</select>  
<Link to="homepageSender"> 
<button onClick={register}>
  Register
</button>
</Link>
       
      
      </header>
    </div>
  );
}

export default RegisterPage;