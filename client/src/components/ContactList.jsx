import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/api';

const ContactList = ({ token, onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await getContacts(token);
      setContacts(contactsData);
    };

    fetchContacts();
  }, [token]);

  return (
    <div className='contacts-list'>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => onSelectContact(contact)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSelectContact(contact);
                }
              }}>
              {contact.contact.firstName} {contact.contact.lastName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
