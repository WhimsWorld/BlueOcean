import React, { useState, useEffect } from 'react';
import {
  Textarea, Button, IconButton, Card, Chip,
} from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChat, postMessage } from '../../app/slices/chatSlice';

export default function LiveChat({ storyId }) {
  const [message, setMessage] = useState('');
  const userId = 'user1_id';
  // const storyId = useSelector((state) => state.story.storyId);
  const chatMessages = useSelector((state) => state.chat.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    if (storyId) {
      dispatch(fetchChat(storyId));
    }
  }, [dispatch, storyId]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(postMessage({ storyId, userId, data: message }));
      setMessage('');
    }
  };

  return (
    <Card className="mt-6 h-1/2 w-96 items-center">
      <div className="chat-messages">
        {chatMessages.map((msg) => (
          <div key={msg.message_id} className={`message ${msg.user_id === userId ? 'right' : 'left'}`}>
            <div className="user">{msg.user_id}</div>
            <div className="text">{msg.data}</div>
            <div className="time">{new Date(msg.date_created).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <div className="flex w-5/6 flex-row gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
        <Textarea
          value={message}
          onChange={handleMessageChange}
          rows={1}
          resize
          placeholder="Your Message"
          className="min-h-full !border-0 focus:border-transparent "
          containerProps={{
            className: 'grid h-full',
          }}
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
        />
        <div>
          <IconButton variant="text" className="rounded-full" onClick={handleSendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            {' '}

          </IconButton>
        </div>
      </div>
    </Card>
  );
}
