// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('chatHistory', (history) => {
      setChatHistory(history);
    });

    // Fetch chat history on component mount
    const token = localStorage.getItem('token');
    socket.emit('getChatHistory', {
      token,
      contactId: 'c6d175cc-fb6e-4637-b402-9a30dada37a2',
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('chatHistory');
    };
  }, []);

  const sendMessage = () => {
    const token = localStorage.getItem('token');
    socket.emit('sendMessage', {
      token,
      receiverId: 'c6d175cc-fb6e-4637-b402-9a30dada37a2',
      message,
    });
    setMessage('');
  };

  return (
    <div>
      <div>
        {chatHistory.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.email}:</strong> {msg.message}
          </div>
        ))}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.email}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
