import React, { useEffect, useState } from 'react';
import { getContacts, getUser, addContact } from '../services/api';

const Sidebar = ({ token, onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddContact = async (email) => {
    const newContact = await addContact(token, email);
    setContacts([...contacts, newContact]);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await getContacts(token);
      setContacts(contactsData);
    };

    const fetchUser = async () => {
      const userData = await getUser(token);
      setUser(userData);
    };
    fetchUser();
    fetchContacts();
  }, [token]);

  return (
    <div className='flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0'>
      <div className='flex flex-row items-center justify-center h-12 w-full'>
        <div className='flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'></path>
          </svg>
        </div>
        <div className='ml-2 font-bold text-2xl'>Baat Karo</div>
      </div>
      <div className='flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg'>
        <div className='h-20 w-20 rounded-full border overflow-hidden'>
          <div className='flex items-center justify-center h-full w-full rounded-full bg-gray-400 flex-shrink-0 text-white text-3xl'>
            {user?.email?.charAt(0)?.toUpperCase()}
          </div>
        </div>
        <div className='text-sm font-semibold mt-2'>{user?.name}</div>
        <div className='text-xs text-gray-500'>{user?.email}</div>
        <div className='flex flex-row items-center mt-3'>
          <div className='flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full'>
            <div className='h-3 w-3 bg-white rounded-full self-end mr-1'></div>
          </div>
          <div className='leading-none ml-1 text-xs'>Active</div>
        </div>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='flex flex-row items-center justify-between text-xs'>
          <span className='font-bold'>Contacts</span>
          <span className='flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full'>
            {contacts.length}
          </span>
        </div>
        <div className='flex h-8 mt-4'>
          <input
            type='email'
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Enter email'
            className='flex-grow p-2 border rounded-l-md'
          />
          <button
            onClick={() => handleAddContact(searchTerm)}
            className='rounded bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white'>
            Add
          </button>
        </div>

        <div className='flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto'>
          {contacts.map((contact) => (
            <button
              key={contact.id}
              className='flex flex-row items-center hover:bg-gray-100 rounded-xl p-2'
              onClick={() => onSelectContact(contact)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSelectContact(contact);
                }
              }}>
              <div className='flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full'>
                {contact.contact.firstName[0]}
              </div>
              <div className='ml-2 text-sm font-semibold'>
                {contact.contact.firstName} {contact.contact.lastName}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
