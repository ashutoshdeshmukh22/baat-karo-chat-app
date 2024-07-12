/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getChatHistory } from '../services/api';
import io from 'socket.io-client';

const ChatWindow = ({ token, selectedContact }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const socket = io('http://localhost:3001', {
    query: { token },
  });

  useEffect(() => {
    // Handle incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('chatHistory', (history) => {
      setChatHistory(history);
    });

    // Fetch chat history when a contact is selected
    if (selectedContact) {
      socket.emit('getChatHistory', {
        token,
        contactId: selectedContact?.contact?.id,
      });
    }

    return () => {
      socket.off('receiveMessage');
      socket.off('chatHistory');
    };
  }, [selectedContact, token, socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      token,
      receiverId: selectedContact?.contact?.id,
      message: newMessage,
    };
    socket.emit('sendMessage', message);
    setNewMessage('');
  };

  return (
    <div className='chat-window'>
      <h2>
        Chat with {selectedContact?.contact?.firstName}{' '}
        {selectedContact?.contact?.lastName}
      </h2>
      <div className='messages'>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === selectedContact?.contact?.id
                ? 'received'
                : 'sent'
            }`}>
            <strong>{msg.sender.email}:</strong> {msg.message}
          </div>
        ))}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === selectedContact?.contact?.id
                ? 'received'
                : 'sent'
            }`}>
            <strong>{msg.sender.email}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className='input-area'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message...'
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
