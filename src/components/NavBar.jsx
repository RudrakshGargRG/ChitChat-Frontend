
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import Logout from './Logout';

function NavBar() {
  const navigate = useNavigate();

  const handleClick = (route) => {
    
      navigate(route);
  
  };


  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>chitchat</h3>
      </div>

      <div className="links">
        <Link to="/" onClick={() => handleClick("/")}>Home</Link>
        <Link to="/userProfile" onClick={() => handleClick("/userProfile")}>My Profile</Link>
        <Link to="/setAvatar" onClick={() => handleClick("/setAvatar")}>Change Avatar</Link>
      </div>

      <div className="logout">
        <Logout />
      </div>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;


  .brand {
    display: flex;
    align-items: center;
    margin-bottom: 1px;
  }

  .brand img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    margin-bottom: 1px;
  }

  .links {
    flex: 1; /* Add this to expand and center the links */
    display: flex;
    justify-content: center;
  }

  .links a {
    margin: 0 1px;
    padding: 8px 16px;
    text-decoration: none;
    color: #ffffff;
  }

  .logout {
    height: 30px;
    // margin-bottom: auto;
  }
`;

export default NavBar;
