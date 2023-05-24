import React, { useState } from 'react'
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../Cart';
import {useCart} from "./ContextReducer";

export default function () {
  let data= useCart()
  const [cartView, setCartView]=useState(false)
  const navigate= useNavigate();
  const handleLogout= ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div id= "navdiv"><nav className="navbar navbar-expand-lg navbar-light bg-gardient">
    <div className="container-fluid">
      <Link className="platepal navbar-brand fs-1 fst-italic fw-normal" to="/">PlatePal</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav me-auto mb-2">
          <li className="nav-item">
            <Link className="nav-link active fs-5 mt-1" aria-current="page" to="/">Home</Link>
          </li>
          {localStorage.getItem("authToken")?
          <li className="nav-item">
            <Link className="nav-link active fs-5 mt-1" aria-current="page" to="/myOrder">My Orders</Link>
          </li> 
          : ""}
          
        </ul>

        {!(localStorage.getItem("authToken"))?

        <div className="d-flex">
            <Link className="navbtn btn mx-1" to="/login">Login</Link>
          
         
            <Link className="navbtn btn mx-1" to="/createuser">Signup</Link>
          </div>
          :
          <div>
            <div className='btn navbtn mx-2' onClick={()=>{setCartView(true)}}>My Cart
            {"  "}
            <Badge pill bg="danger">{data.length}</Badge>
            </div>
            {cartView ? <Modal onClose={()=> setCartView(false)}><Cart /></Modal>: null}
          <div className='btn navbtn mx-2' onClick={handleLogout}>Logout</div>
          </div>
        }</div>
    </div>
  </nav></div>
  )
}
