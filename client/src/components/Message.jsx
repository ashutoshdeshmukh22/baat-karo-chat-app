import React from 'react';

const Message = ({ message, isReceived }) => {
  const profileInitial = message.sender.email.charAt(0).toUpperCase();
  return (
    <div
      className={`col-start-${isReceived ? '1' : '6'} col-end-${
        isReceived ? '8' : '13'
      } p-3 rounded-lg`}>
      <div
        className={`flex items-center ${
          isReceived ? '' : 'justify-start flex-row-reverse'
        }`}>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
          {profileInitial}
        </div>
        <div
          className={`relative ${
            isReceived ? 'ml-3 bg-white' : 'mr-3 bg-indigo-100'
          } text-sm py-2 px-4 shadow rounded-xl`}>
          <div>{message.message}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
