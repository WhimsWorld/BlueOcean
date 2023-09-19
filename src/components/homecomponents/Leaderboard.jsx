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
    console.log(id);
    navigate('/storyBoard');
  };

  const [popoverContent, setPopoverContent] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (entry, event) => {
    const content = (
      <Typography variant="body2" color="blue-gray">
        {entry.summary}
      </Typography>
    );

    setPopoverContent(content);

    const rect = event.target.getBoundingClientRect();
    setPopoverPosition({
      top: rect.top + 5 + window.scrollY,
      left: 0,
    });
  };

  const handleMouseLeave = () => {
    setPopoverContent(null);
  };

  return (
    <Card style={{ width: 250 }} className="w-96">
      <List>
        {leaderboard.map((entry) => (
          <ListItem
            key={entry.story_id}
            onClick={() => clickHandler(entry.story_id)}
            onMouseEnter={(event) => handleMouseEnter(entry, event)}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="candice"
                src={entry.thumbnail_url}
                style={{ width: 43, height: 43 }}
              />
            </ListItemPrefix>

            <div>
              <Typography variant="h6" color="blue-gray">
                {entry.title}
              </Typography>
            </div>
            <ListItemSuffix>
              <Chip
                value={entry.like_count}
                variant="ghost"
                size="sm"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      {popoverContent && (
        <div
          className="absolute bg-white shadow-lg rounded p-4 z-10"
          style={{ ...popoverPosition }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {popoverContent}
        </div>
      )}
    </Card>
  );
}
