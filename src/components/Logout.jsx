import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'


export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    }
  return (
    <Button onClick={handleLogout} ><BiPowerOff/>logout</Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0.3rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  color: #ebe7ff;
  gap: 0.5rem;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    
  }
`;