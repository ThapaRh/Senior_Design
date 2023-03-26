import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {

    const history = useNavigate();

    const [email,setEmail]= useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(res=>{
                if(res.data="Exists!"){
                    history("/home",{state:{id:email}})

                }
                else if(res.data="Does not Exists!"){
                    alert("User Not Signed Up!")
                }
            })
            .catch(e=>{
                alert("Wrong Details!")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"></input>

                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"></input>

                <input type="submit" onClick={submit}></input>
            </form>

            <br />

            <p>OR</p>

            <br />

            <Link to="/signup">Signup Page</Link>


        </div>
    )
}

export default Login