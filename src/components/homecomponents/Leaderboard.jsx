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
  };

  const [popoverContent, setPopoverContent] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (entry, event) => {
    const summary = entry.summary.length > 200
      ? entry.summary.slice(0, 200) + '...'
      : entry.summary;

    const content = (
      <Typography variant="h6" color="blue-gray">
        {summary}
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
    <Card style={{ maxWidth: '250px' }} className="h-full rounded-none rounded-r-xl">
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
                // src={entry.thumbnail_url}
                src="https://res.cloudinary.com/dnr41r1lq/image/upload/v1695227750/whimsibubble_ch5qpw.png"
                // className={`before:bg-${entry.thumbnail_url}`}
                style={{ width: 50, height: 50, overflow: 'hidden', before: { content: entry.thumbnail_url, position: 'absolute' } }}
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
