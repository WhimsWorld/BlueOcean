import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  List,
  Card,
  ListItem,
  Typography,
  Chip,
  ListItemPrefix,
  ListItemSuffix,
  Avatar,
} from '@material-tailwind/react';
import { setStory } from '../../app/slices/storySlice';

export default function Leaderboard({ leaderboard }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (id) => {
    dispatch(setStory(id));
    navigate(`/storyBoard/${id}`);
    window.scrollTo(0, 0);
  };

  const [popoverContent, setPopoverContent] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (entry, event) => {
    if (entry.summary) {
      const summary = entry.summary.length > 250
        ? `${entry.summary.slice(0, entry.summary.lastIndexOf(' ', 250))}...`
        : entry.summary;
      const content = (
        <div>
          <Typography className="font-croissant" variant="h6" color="gray" style={{ textDecoration: 'underline' }}>
            Description:
          </Typography>
          <Typography className="font-serif" color="gray">
            {summary}
          </Typography>
        </div>
      );
      setPopoverContent(content);
    }

    const rect = event ? event.target.getBoundingClientRect() : null;
    if (rect) {
      setPopoverPosition({
        top: rect.top + 5 + window.scrollY,
        left: 0,
      });
    }
  };

  const handleMouseLeave = () => {
    setPopoverContent(null);
  };

  return (
    <Card style={{ maxWidth: '320px', backgroundImage: `url(${rightPanel})`, backgroundRepeat: 'round' }} className="h-full rounded-none rounded-r-xl">
      <span style={{ fontSize: '20px' }} className="font-semibold font-croissant underline self-center mb-4 pt-5">All Time Top 10</span>
      <List>
        {leaderboard.map((entry) => (
          <ListItem
            key={entry.story_id}
            onClick={() => clickHandler(entry.story_id)}
            onMouseEnter={(event) => handleMouseEnter(entry, event)}
            onMouseLeave={handleMouseLeave}
            className="relative bg-white transition-colors duration-300 hover:bg-whimsipink"
          >
            <Avatar
              variant="circular"
              alt="candice"
              src={entry.gif_url}
              style={{ width: 50, height: 50, marginRight: '10px' }}
            />
            <ListItemPrefix className="relative">
              <div className="absolute h-full w-full inset-0 bg-cover" style={{ backgroundImage: `url(${entry.thumbnail_url})` }} />
            </ListItemPrefix>
            <div>
              <Typography className="font-croissant" variant="h6" color="gray">
                {entry.title}
              </Typography>
            </div>
            <ListItemSuffix>
              <Chip
                value={entry.like_count}
                variant="ghost"
                size="sm"
                className="rounded-full"
                style={{ color: 'white', backgroundColor: '#101A4B' }}
              />
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      {popoverContent && (
        <div
          className="absolute bg-white shadow-lg rounded p-4 z-10"
          style={{ ...popoverPosition, borderRadius: '20px' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {popoverContent}
        </div>
      )}
    </Card>
  );
}

const rightPanel = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695244009/paperRight_bly8zj.png';
