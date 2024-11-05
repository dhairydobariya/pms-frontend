import React, { useState } from 'react';
import { ListGroup, Form, InputGroup } from 'react-bootstrap';
import './ChatList.scss';

const ChatList = ({ chats, activeChat, onChatSelect, onNewChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-list-search">
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control 
            type="text" 
            placeholder="Search Patient" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>
      <ListGroup>
        {filteredChats.map((chat) => (
          <ListGroup.Item
            key={chat.id}
            active={activeChat && activeChat.id === chat.id}
            onClick={() => onChatSelect(chat)}
            className="d-flex align-items-center"
          >
            <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
            <div className="chat-info">
              <h3>{chat.name}</h3>
              <p>{chat.lastMessage}</p>
            </div>
            <span className="chat-time">{chat.lastMessageTime}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatList;