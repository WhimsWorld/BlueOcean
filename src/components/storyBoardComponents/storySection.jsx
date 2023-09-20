import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { fetchStoryById } from '../../app/slices/storySlice';

export default function StorySection() {
  const dispatch = useDispatch();
  const storyId = useSelector((state) => state.story.storyId);
  const storyData = useSelector((state) => state.story.storyData);

    // get the posts for this storyID
    const getPosts = () => {



    }


  useEffect(() => {
    if (storyId) {
      dispatch(fetchStoryById(storyId));
    }
  }, [dispatch, storyId]);



  if (!storyData) return null;
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
            Story Section
            <audio className="player" controls preload="none">
              <source src= ""type="audio/mp3" />
            </audio>
        </Typography>
      </CardBody>
    </Card>
  );
}
