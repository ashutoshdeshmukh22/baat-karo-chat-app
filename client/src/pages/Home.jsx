import React, { useState, useEffect } from 'react';
import ContactList from '../components/ContactList';
import ChatWindow from '../components/ChatWindow';
import { login } from '../services/api';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';

import '../App.css';

function App() {
  const [token, setToken] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);
  return (
    <div className='flex h-screen antialiased text-gray-800'>
      <div className='flex flex-row h-full w-full overflow-x-hidden'>
        <Sidebar token={token} onSelectContact={handleSelectContact} />
        <ChatBox token={token} selectedContact={selectedContact} />
      </div>
    </div>
  );
}

export default App;
