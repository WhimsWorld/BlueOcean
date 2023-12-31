import React, { useState, useEffect, useRef } from 'react';
import {
  Textarea, IconButton, Card,
} from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { fetchChat, postMessage } from '../../app/slices/chatSlice';

export default function LiveChat({ storyId }) {
  const [message, setMessage] = useState('');
  const userId = Cookies.get('userId');
  const chatMessages = useSelector((state) => state.chat.messages);
  const navigate = useNavigate();
  const chatRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (storyId) {
      dispatch(fetchChat(storyId));
    }

    // Set an interval to refresh chat messages every 15 seconds
    const intervalId = setInterval(() => {
      dispatch(fetchChat(storyId));
    }, 15000);

    return () => clearInterval(intervalId);
  }, [dispatch, storyId]);

  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 0);
    }
  }, [chatMessages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!userId) {
      navigate('/login');
      return;
    }
    if (message.trim()) {
      dispatch(postMessage({ storyId, userId, data: message }));
      setMessage('');
    }
  };

  return (
    <Card
      className="h-full rounded-none rounded-r-xl px-2"
      style={{
        maxWidth: '320px',
        backgroundImage: `url(${rightPanel})`,
        backgroundRepeat: 'round',
        justifySelf: 'end',
      }}
    >
      <h1
        className="font-croissant"
        style={{
          textAlign: 'center', textDecoration: 'underline', fontSize: '20px', marginTop: '18px',
        }}
      >
        <b>Live Chat</b>
      </h1>
      <div
        className="chat-messages overflow-y-auto h-96 mt-4"
        ref={chatRef}
        style={{
          border: '1px solid rgba(131, 105, 83, 0.2)',
          borderRadius: '25px',
          background: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        {chatMessages.map((msg) => (
          <div key={msg.message_id} className={`${msg.user_id === userId ? 'ml-16' : ''}`}>
            <div className="user text-sm ml-2 font-croissant text-gray-500">
              {msg.username}
              {' '}
              {new Date(msg.date_created).toLocaleTimeString()}
            </div>
            <div className={`${msg.user_id === userId ? 'bg-whimsipink ' : 'bg-white'} border rounded-md m-1 p-2 px-4 w-44 text-black font-serif`}>
              {msg.data}
            </div>
          </div>
        ))}
      </div>
      <div className="flex  flex-row gap-2 my-4 mx-auto rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
        <Textarea
          value={message}
          onChange={handleMessageChange}
          rows={1}
          resize
          placeholder="Share your thoughts..."
          className="min-h-full !border-0 focus:border-transparent font-croissant mx-auto"
          containerProps={{
            className: 'grid h-full',
          }}
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          style={{
            resize: 'none',
            fontFamily: 'serif',
            fontSize: '18px',
          }}
        />
        <div className="flex items-center justify-center">
          <IconButton
            variant="text"
            className="rounded-full"
            onClick={handleSendMessage}
            color="indigo"
            style={{ padding: '8px', margin: '4px' }} // Add this style
          >
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
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

const rightPanel = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695244009/paperRight_bly8zj.png';
