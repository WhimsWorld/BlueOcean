import React from 'react';
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

export default function Leaderboard() {
  const list = [
    {
      title: 'A title',
      description: 'Horror',
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      count: 10,
    },
    {
      title: 'A title',
      description: 'Horror',
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      count: 10,
    },
    {
      title: 'A title',
      description: 'Horror',
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      count: 10,
    },
    {
      title: 'A title',
      description: 'Horror',
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      count: 10,
    },
    {
      title: 'A title with a ',
      description: 'Horror',
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      count: 10,
    },
    {
      title: 'A title',
      description: 'Horror',
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      count: 10,
    },
  ];

  return (
    <Card style={{ width: 250 }} className="w-96">
      <List>
        {list.map(
          (entry, i) => (
            <ListItem>
              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={entry.image} style={{ width: 43, height: 43 }} />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {entry.title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {entry.description}
                </Typography>
              </div>
              <ListItemSuffix>
                  <Chip
                    value={entry.count}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    // style={{left: 20}}
                  />
                </ListItemSuffix>
            </ListItem>
          ),
        )}
      </List>
    </Card>
  );
}
