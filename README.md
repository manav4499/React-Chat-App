# React Chat Application 

# Chat Application using Socket Events

This project demonstrates a basic chat application using socket events. Users can register, send broadcast messages, and communicate privately with each other.

---

## Features

1. **Register User**: 
   - Users can register their nickname upon connecting.
   - Allows identification in the chatroom.

2. **Broadcast Messages**:
   - Users can send messages visible to all connected participants.

3. **Private Messages**:
   - Enables private communication between specific users.

---

## Socket Event Details

### 1. Register User
- **Event Name**: `register_user`
- **Emit**: When a user connects, send their nickname.
- **Data to Send**:
  ```json
  {
    "type": "string",
    "example": "JohnDoe"
  }
  ```
- **Description**: This event registers the user on the server so that they can participate in the chat.

### 2. Broadcast Message
- **Event Name**: `message`
- **Emit**: When a user wants to send a broadcast message.
- **Data to Send**:
  ```json
  {
    "type": { "message": "string" },
    "example": { "message": "Hello World" }
  }
  ```
- **Receive**: When a broadcast message is received.
- **Data Received**:
  ```json
  {
    "type": { "user": "string", "message": "string" },
    "example": { "user": "JohnDoe", "message": "Hello everyone!" }
  }
  ```
- **Description**: Sends and receives messages visible to all connected users.

### 3. Private Message
- **Event Name**: `direct_message`
- **Emit**: When a user wants to send a private message to another user.
- **Data to Send**:
  ```json
  {
    "type": { "recipient": "string", "message": "string" },
    "example": { "recipient": "JaneDoe", "message": "Hey, how are you?" }
  }
  ```
- **Receive**: When a private message is received.
- **Data Received**:
  ```json
  {
    "type": { "from": "string", "message": "string" },
    "example": { "from": "JaneDoe", "message": "I'm good, thanks!" }
  }
  ```
- **Description**: Sends and receives messages between specific users.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chat-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open the client in a browser (default: `http://localhost:3000`).

---

## Usage

1. Connect to the chat by entering your nickname.
2. Send a broadcast message to all users.
3. Send private messages by specifying the recipient's nickname.

---

## Technologies Used

- **Node.js**
- **Socket.IO**
- **HTML/CSS**

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

