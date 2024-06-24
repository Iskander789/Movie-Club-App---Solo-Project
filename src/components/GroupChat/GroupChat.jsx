// src/components/GroupChat/GroupChat.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupMessages, postMessage } from '../../redux/actions/groupActions';
import './GroupChat.css';

function GroupChat({ groupId }) {
  const dispatch = useDispatch();
  const messages = useSelector((store) => store.group.messages);
  const user = useSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    dispatch(fetchGroupMessages(groupId));
  }, [dispatch, groupId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      dispatch(postMessage(groupId, { text: newMessage, user_id: user.id }));
      setNewMessage('');
    }
  };

  return (
    <div className="group-chat-container">
      <h3>Group Chat</h3>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.username}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default GroupChat;
