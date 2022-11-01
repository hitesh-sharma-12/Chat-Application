import React from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';

let user;
const Join = () => {
  let [name, setname] = useState("");

  const sendUser = () =>{
    user = name;
    document.getElementById("joinInput").value = "";
  }

  return (
      <div className= 'joinPage'>
        <div className= 'joinContainer'>
        <img src= { logo } alt= "logo" />
        <h1>Chat Application</h1>
        <input type= "text" onChange = {(e) => setname(e.target.value)} placeholder= "Enter your name" id= "joinInput" />
        <Link onClick = {(event) => !name ? event.preventDefault() : null} to= "/chat"><button onClick = { sendUser } className= "joinBtn">Click</button></Link>
        </div>
    </div>
  )
}

export default Join
export { user }