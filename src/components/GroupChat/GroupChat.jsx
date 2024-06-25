// src/components/GroupChat/GroupChat.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupMessages, postMessage } from '../../redux/actions/groupActions';
import './GroupChat.css';

function GroupChat({ groupId }) {
  const dispatch = useDispatch();
  const groupMessages = useSelector((store) => store.group.groupMessages || []);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchGroupMessages(groupId));
  }, [dispatch, groupId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(postMessage({ groupId, message: { text: message } }));
      setMessage('');
    }
  };

  return (
    <div className="group-chat-container">
      <h3>Group Chat</h3>
      <div className="messages">
        {groupMessages.length > 0 ? (
          groupMessages.map((msg) => (
            <div key={msg.id} className="message">
              <strong>{msg.username}: </strong>
              <span>{msg.text}</span>
            </div>
          ))
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}

export default GroupChat;
