/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Message from './Message';

const ChatWindow = ({ token, selectedContact }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const socket = io('http://localhost:3001', {
    query: { token },
  });

  useEffect(() => {
    if (!selectedContact) return;

    // Handle incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('chatHistory', (history) => {
      setChatHistory(history);
    });

    // Fetch chat history when a contact is selected
    socket.emit('getChatHistory', {
      token,
      contactId: selectedContact?.contact?.id,
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('chatHistory');
      socket.disconnect();
    };
  }, [selectedContact, token]);

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

  if (!selectedContact) {
    return (
      <div className='flex flex-col flex-auto h-full p-6'>
        <div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4'>
          <h2 className='text-xl font-bold mb-4'>
            Select a contact to start chatting
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col flex-auto h-full p-6'>
      <div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4'>
        <h2 className='text-xl font-bold mb-4'>
          Chat with {selectedContact?.contact?.firstName}{' '}
          {selectedContact?.contact?.lastName}
        </h2>
        <div className='flex flex-col h-full overflow-y-auto mb-4'>
          <div className='grid gap-y-2'>
            {chatHistory.map((msg, index) => (
              <Message
                key={index}
                message={msg}
                isReceived={msg.sender.id === selectedContact?.contact?.id}
              />
            ))}
            {messages.map((msg, index) => (
              <Message
                key={index}
                message={msg}
                isReceived={msg.sender.id === selectedContact?.contact?.id}
              />
            ))}
          </div>
        </div>
        <div className='flex'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type a message...'
            className='flex-grow p-2 border rounded-l-md'
          />
          <button
            onClick={handleSendMessage}
            className='bg-blue-500 text-white p-2 rounded-r-md'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
