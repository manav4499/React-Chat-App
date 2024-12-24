import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";

const socket = io.connect("https://stingray-app-7s57q.ondigitalocean.app");

const App = () => {
  const [nickname, setNickname] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
  const [broadcastMessages, setBroadcastMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [privateRecipient, setPrivateRecipient] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(()=>{
    socket.on("message", (data)=>{
      setBroadcastMessages((message)=>[
        ...message, `${data.user} : ${data.message}`,
      ])
    })

    socket.on("direct_message", (data)=>{
      setPrivateMessages((message)=>[
        ...message, `${data.from} : ${data.message}`,
      ])
    })
    
    return () =>{
      socket.off("");
    }
  }, [])

  const sendNickName =() =>{
    if(nickname.trim() !== ""){
      setIsConnected(true);
      socket.emit("register_user", nickname);
      setNickname("");
    }
  }

  
  const sendBroadCastMessage = () =>{
    if(broadcastMessage.trim() !== ""){
      socket.emit("message", {message : broadcastMessage});
    } 
  }

  const sendPrivateMessage = () =>{
    if(privateMessage.trim() !== ""){
      socket.emit("direct_message", {recipient: privateRecipient, message : privateMessage});
    }
  }

  return (
    <div className="chat-container">
      <div className="connection-area">
        <h3>Enter Your Nickname to Connect</h3>
        <input
          type="text"
          placeholder="Nickname..."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isConnected}
        />
        <button disabled={isConnected} onClick={sendNickName}>Connect</button>
      </div>

      <div className="messaging-section">
        <div className="broadcast-message-section">
          <h4>Broadcast Message</h4>
          <input
            type="text"
            placeholder="Broadcast Message..."
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            disabled={!isConnected}
          />
          <button disabled={!isConnected} onClick={sendBroadCastMessage}>Send Broadcast</button>
        </div>

        <div className="private-message-section">
          <h4>Private Message</h4>
          <input
            type="text"
            placeholder="Recipient's Nickname..."
            value={privateRecipient}
            onChange={(e) => setPrivateRecipient(e.target.value)}
            disabled={!isConnected}
          />
          <input
            type="text"
            placeholder="Private Message..."
            value={privateMessage}
            onChange={(e) => setPrivateMessage(e.target.value)}
            disabled={!isConnected}
          />
          <button disabled={!isConnected} onClick={sendPrivateMessage}>Send Private Message</button>
        </div>
      </div>

      <div className="messages-container">
        <div className="broadcast-messages-box">
          <h3>Broadcast Messages</h3>
          <div className="messages-box">
            {broadcastMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        </div>

        <div className="private-messages-box">
          <h3>Private Messages</h3>
          <div className="messages-box">
            {privateMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
