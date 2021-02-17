import { Button } from 'bootstrap';
import React, { useState } from 'react'
import {NavDropdown,Container,Nav,Navbar} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PUBLIC_PATH } from '../Constant';



const Header=(props)=>{

  const logout=()=>{
    localStorage.removeItem('loginData');
    window.location.href= PUBLIC_PATH + "login"
  }
  
    return(
        <React.Fragment>
      
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Link to={`${PUBLIC_PATH}`}>
          <Navbar.Brand>Task Management</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to={`${PUBLIC_PATH}`}>
              <Nav.Item className="btn text-white">Home</Nav.Item>
            </Link>
            <Link to={`${PUBLIC_PATH}about`}>
              <Nav.Item className="btn text-white">About</Nav.Item>
            </Link>
         
           

            {props.authInfo.isLoggedIn && (
              <>
              <Link to={`${PUBLIC_PATH}projectList`}>
              <Nav.Item className="btn text-white">All Project</Nav.Item>
            </Link>
              <Link  to={`${PUBLIC_PATH}login`}>
              <Nav.Item className="btn text-white" onClick={()=>logout()}>Logout</Nav.Item>
            </Link>
            </>
            ) }
           

            {!props.authInfo.isLoggedIn && (
              <>
              <Link to={`${PUBLIC_PATH}register`}>
              <Nav.Item className="btn text-white">Sign up</Nav.Item>
              </Link>
              <Link to={`${PUBLIC_PATH}login`}>
              <Nav.Item className="btn text-white">Sign in</Nav.Item>
            </Link>
             </>
            ) }

            

           
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
       </React.Fragment>
    )
}

export default Header;