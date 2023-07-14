
import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import { useNavigate, useLocation } from "react-router-dom";
import { updateUserProfileRoute, getUserProfileRoute } from '../utils/APIRoutes';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserProfile() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [editingAbout, setEditingAbout] = useState(false); // Track if the user is currently editing the "About" section
  const [newAbout, setNewAbout] = useState(''); // Store the updated "About" text
  // const [canEdit, setCanEdit] = useState(false); // Track if the user can edit the "About" section

  const navigate = useNavigate();
  const location = useLocation();



  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const storedUser = await JSON.parse(localStorage.getItem("chat-app-user"));
        const res = await axios.get(`${getUserProfileRoute}/${storedUser._id}`);
        const fetchedUser = res.data;
        console.log(res);
        if(fetchedUser) setCurrentUser(fetchedUser);
        else setCurrentUser(storedUser);
      }
    };
  
    checkUser();
  }, []);

  const handleEditAbout = () => {
    setNewAbout(currentUser.about); // Initialize the input field with the current "About" text
    setEditingAbout(true);
  };

  const handleSaveAbout = async () => {
    try {
      const res = await axios.post(`${updateUserProfileRoute}/${currentUser._id}`, {
        about: newAbout
      });
    
      const user = res.data.user;
      if (user) {
        setCurrentUser({ ...currentUser, about: newAbout }); // Update the local state with the new "About" text
        setEditingAbout(false);
      } else {
        toast.error("Error Updating User Profile", toastOptions);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Updating User Profile", toastOptions);
    }
  };

  const handleCancelEditAbout = () => {
    setEditingAbout(false);
  };

  const handleAboutChange = (e) => {
    setNewAbout(e.target.value);
  };

  return (
    currentUser && (
      <Container>
        <NavBar />
        <div className='card'>
          <div className="top">
            <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" />
            <h3>{currentUser.username}</h3>
          </div>
          <div className="bottom">
            {editingAbout ? (
              <div className="edit-about">
                <textarea value={newAbout} onChange={handleAboutChange} />
                
              </div>
            ) : (
              <div className="about">
                {currentUser.about}
              </div>
            )}
          </div>
          <div className="button-container">
            {editingAbout ? (
              <>
                <button className="save-button" onClick={handleSaveAbout}>Save</button>
                <button className="cancel-button" onClick={handleCancelEditAbout}>Cancel</button>
              </>
            ) : (
              // <button className="edit-button" onClick={handleEditAbout}>Edit</button>
     
                <button className="edit-button" onClick={handleEditAbout}>Edit</button>
              
            )}
          </div>
        </div>
        <ToastContainer />
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
  .edit-about textarea {
    background-color: transparent;
    color: white;
    border: none;
    resize: none;
    width: 100%;
    height: 150px;
    
    padding: 10px;
    font-size: 16px;
    font-family: inherit;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: white transparent;
  }

  .edit-about textarea::-webkit-scrollbar {
    width: 8px;
  }

  .edit-about textarea::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .edit-about textarea::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 4px;
  }

  .button-container {
    margin-top: 10px;
  }
  .edit-button,
  .save-button,
  .cancel-button {
    color: white;
    background-color: #9a86f3;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 8px;
  }

  .edit-button:hover,
  .save-button:hover,
  .cancel-button:hover {
    background-color: rgb(58, 55, 76);
  }
`;

export default UserProfile;
