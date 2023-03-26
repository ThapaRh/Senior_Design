import React, { Component, useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    let response;
    try {
      response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    } catch (e) {
      console.log(e);
    }
    const responseData = await response.json();
    auth.login(responseData.userId, responseData.token);
    navigate("/");
    console.log(responseData);
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        ></input>

        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        ></input>

        <input type="submit" onClick={submit}></input>
      </form>

      <br />

      <p>OR</p>

      <br />

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Auth;
