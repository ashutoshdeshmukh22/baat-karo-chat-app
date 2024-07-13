# Chat Application

This is a chat application with functionality for user authentication and chatting with contacts. Users can log in, add contacts, and chat with them in real-time.

## Features

- User authentication with email and password
- Local storage for JWT token
- Protected routes
- Add contacts
- Real-time chatting with contacts
- Logout functionality

## Tech Stack

- **Front End:** React, Vite
- **Back End:** NestJS, PostgreSQL
- **Real-time Communication:** Websockets, Socket.IO

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ashutoshdeshmukh22/baat-karo-chat-app.git
cd chat-app
```

2. Install the dependencies for the front end:
```bash
cd client
npm install
```

3. Install the dependencies for the backend end:
```bash
cd server
npm install
```

### NOTE: Before Starting The Servers Create A Database Name baat-karo In your Postgre SQL DB Server

4. Start the development frontend server:
```bash
cd client
npm run dev
```

5. Start the development backend server: 
```bash
cd server
npm run start:dev
```

## Usage
- Open your browser and navigate to http://localhost:3000.
- Enter your email and password to log in.
- Upon successful login, you will be redirected to the home page.
- Add contacts to chat with them.
- You can log out by clicking the logout button on the home page.
