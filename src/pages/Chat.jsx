import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {allUsersRoute, host} from '../utils/APIRoutes'
import {io} from "socket.io-client"


function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
  
    checkUser();
  }, []);

  useEffect (()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data);
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error condition if needed
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };
  
    fetchData();
  }, [currentUser]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (

      <Container>
        
        <div className="container">
        {/* passing contacts, currentuser and func handleChatChange as prop */}
        
        <Contacts contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange}>
        </Contacts> 
        {isLoaded && currentChat===undefined ? 

        (
        <Welcome currentUser={currentUser}/>
        ) : 

        (
        <ChatContainer 
        currentChat={currentChat}  
        currentUser={currentUser}
        socket = {socket}
        />
      )}
        
        </div>
      </Container>

  )
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  gap : 1rem;
  background-color: #131324;
  .container {
    color: white;
    height : 85vh;
    width : 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720 px) 
    and (max-width: 1080px) {
      grid-template-columns: 35% 65 %;
    }
    @media screen and (min-width: 360 px) 
    and (max-width: 480px) {
      grid-template-columns: 45% 55 %;
    }

  }
`
export default Chat
