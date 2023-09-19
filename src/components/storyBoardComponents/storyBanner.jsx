import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { fetchStoryById } from '../../app/slices/storySlice';

export default function StoryBanner() {
  const dispatch = useDispatch();
  const storyId = useSelector((state) => state.story.storyId);
  const storyData = useSelector((state) => state.story.storyData);
  useEffect(() => {
    if (storyId) {
      dispatch(fetchStoryById(storyId));
    }
  }, [dispatch, storyId]);

  if (!storyData) return null;

  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={storyData.image_url}
          alt={storyData.title}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {storyData.title}
        </Typography>
        <Typography>
          {storyData.summary}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}
