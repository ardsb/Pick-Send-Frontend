
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login() {
        let item = {
            email,
            password
        };
        console.warn(item);

        const result = await fetch("http://localhost:8080/api/user/login", {
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
                    //success
                    if (data.userRole === 'ADMIN'){
                        navigate(`/admin/home`);
                    }else{
                        navigate(`/sender/home`);
                    }
                }else{
                    //todo show error message
                }
            });


    }


    return (
        <>
            <div className="App">
                <h1> Pick Send</h1>
                <h3> Login Using Email and password</h3>
                <div style={{ alignItems: "center", flexDirection:"column"}}>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button style={{ marginTop: 10 }} onClick={login}>
                        Login
                    </button>
                </div>

            </div>
        </>
    );
}

export default Login;
