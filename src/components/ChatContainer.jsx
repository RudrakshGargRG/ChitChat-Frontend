import React, {useState , useEffect, useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { sendMessageRoute, getAllMessagesRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';




export default function ChatContainer({currentChat, currentUser, socket}) {
        const [messages, setMessages] = useState([]);
        const [arrivalMessage, setArrivalMessage] = useState(null);
        const scrollRef = useRef();
        const Navigate = useNavigate();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await axios.post(getAllMessagesRoute, {
                        from: currentUser._id,
                        to: currentChat._id 
                    });
                    // console.log(res);
                    setMessages(res.data.projectMessages);
                } catch (error) {
                    // Handle error
                }
            };
        
            fetchData();
        }, [currentChat]);

        useEffect(() => {
          const getCurrentChat = async () => {
            if (currentChat) {
              await JSON.parse(
                localStorage.getItem("chat-app-user")
              )._id;
            }
          };
          getCurrentChat();
        }, [currentChat]);

    const handleSendMsg = async (msg) => {
        const data = {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        }
        await axios.post(sendMessageRoute, data);
        socket.current.emit("send-msg", data);
        
        const msgs = [...messages];
        msgs.push({
          fromSelf: true, 
          message: msg
        });
        setMessages(msgs);
    }




    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          
          setArrivalMessage({ fromSelf: false, message: msg });
        });
      }
    }, []);
  
    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleViewProfile = () => 
    {
      Navigate(`/friendProfile/${currentChat._id}`);
    };
    


  return (
    currentChat && (

    <Container>

        <div className="chat-header">
            <div className="user-details">

                <div className="avatar">
                    <img
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt="avatar"
                    />
                </div>

                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>

                <div className="view-profile-button">
                    <button onClick={handleViewProfile}>View Profile</button>
                </div>

            </div>


        </div>

 
        <div className="chat-messages">
        {
            messages.map((message) => {
            return (
                // scrollRef to add chat scroll to bottom and uuid for unique id
                <div ref={scrollRef} >
                <div
                    className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                    }`}
                >
                    <div className="content ">
                    <p>{message.message}</p>
                    </div>
                </div>
                </div>
            );
        })}
      </div>

        <ChatInput handleSendMsg = {handleSendMsg} />
    </Container>
  )
  
  )
}
const Container = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2.6rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      .view-profile-button {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        margin-left: auto;
        button {
          color: white;
          background-color: #9a86f3;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: rgb(58, 55, 76);
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;


// const Container = styled.div`
//   margin-top: 10px;
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding:  2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       .avatar {
//         img {
//           height: 2.6rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//       .view-profile-button {
//         display: flex;
//         align-items: center;
//         justify-content: flex-end;
//         gap: 1rem;
        
    
//         button {
//           color: white;
//           background-color: #4caf50;
//           border: none;
//           padding: 8px 16px;
//           border-radius: 4px;
//           cursor: pointer;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 1rem;
//         font-size: 1.1rem;
//         border-radius: 1rem;
//         color: #d1d1d1;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #4f04ff21;
//       }
//     }
//     .recieved {
//       justify-content: flex-start;
//       .content {
//         background-color: #9900ff20;
//       }
//     }
//   }
// `;