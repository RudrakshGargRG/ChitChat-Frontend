
import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfileRoute } from '../utils/APIRoutes';
import axios from 'axios';
import styled from 'styled-components';

// ... (rest of the code)

function FriendProfile() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const { userId } = useParams(); 

  

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const res = await axios.get(`${getUserProfileRoute}/${userId}`);
        const fetchedUser = res.data;
        console.log(res);
        if(fetchedUser) setCurrentUser(fetchedUser);
        else alert("User not found");
      }
    };
  
    checkUser();
  }, []);

  
  

  

  return (
    currentUser ? (
      <Container>
        <NavBar />
        <div className='card'>
          <div className="top">
            <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" />
            <h3>{currentUser.username}</h3>
          </div>
          <div className="bottom">
            
              <div className="about">
                {currentUser.about}
              </div>
            
          </div>
          
        </div>
      </Container>
    )
    : (
        <Container>
        <NavBar />
        <div className='card'>
          <div className="top">
            {/* <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" /> */}
            {/* <h3>{currentUser.username}</h3> */}
          </div>
          <div className="bottom">
            
              <div className="about">
                {/* {currentUser.about} */}
              </div>
            
          </div>
          
        </div>
      </Container>
    )
  );
}

const Container = styled.div`
  background-color: rgb(19, 19, 35);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    background-color: black;
    width: 50%;
    height: 80%;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .top {
    text-align: center;
    margin-bottom: 20px;
  }

  .top img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .top h3 {
    color: white;
    margin-top: 10px;
  }

  .bottom {
    background-color: rgb(58, 55, 76);
    width: 80%;
    height: 40%; 
    margin-top: 40px;
    border-radius: 20px;
    padding: 10px; 
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about {
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

`;

export default FriendProfile;
