import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { setStory } from '../../app/slices/storySlice';

export default function StoryCard({
  story, likeUpdate,
  likedStories,
  setLikeUpdate,
  setLikedStories,
  loggedIn,
  setLoggedIn,
}) {
  const storyId = story.story_id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState(likedStories[story.story_id] ? 'red' : 'white');

  useEffect(() => {
    if (likedStories[story.story_id]) {
      setColor('red');
    } else {
      setColor('white');
    }
  }, []);

  const clickHandler = () => {
    dispatch(setStory(storyId));
    navigate(`/storyBoard/${storyId}`);
  };

  const likeClickHandler = () => {
    if (loggedIn) {
      const isLiked = color === 'red';

      const data = {
        storyId: story.story_id,
        userId: loggedIn, // logged in contains info of user currently logged in
      };

      if (isLiked) {
        setColor('white');
        axios
          .delete('api/deletelike', { data })
          .then((response) => {
            setLikedStories(response.data);
            setLikeUpdate((prev) => !prev); // Toggle the state
          })
          .catch(() => {});
      } else {
        setColor('red');
        axios
          .post('api/postlike', data)
          .then((response) => {
            setLikedStories(response.data);
            setLikeUpdate((prev) => !prev); // Toggle the state
          })
          .catch(() => {});
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className="w-full flex-row p-2 mt-4 shadow-lg justify-between items-center justify-self-center bg-cover" style={{ width: '96%', backgroundImage: `url(${cardBG})`, clipPath: 'polygon(59% 2%, 68% 3%, 75% 0, 83% 2%, 90% 3%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 96%, 63% 100%, 54% 96%, 44% 100%, 36% 100%, 30% 96%, 17% 98%, 7% 96%, 0 100%, 1% 71%, 0 43%, 1% 0, 9% 2%, 18% 0, 31% 3%, 48% 0)' }}>
      <CardHeader floated={false} style={{ height: '30%', width: '30%', margin: '2%' }}>
        <img
          src={story.image_url}
          alt={story.title}
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          onClick={likeClickHandler}
          size="sm"
          color={color}
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody className="flex flex-col p-2 self-start" style={{ width: '70%' }}>
        <div className="flex flex-col">
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal self-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-whimsiorange"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {story.like_count}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="font-medium">
            {story.title}
          </Typography>
        </div>
        <Typography color="gray">
          {story.date_created}
        </Typography>
        <Typography color="gray">
          {story.summary.length > 150 ? `${story.summary.slice(0, 150)} ...` : story.summary}
        </Typography>
        <CardFooter className="p-2 self-end absolute" style={{ bottom: '5%' }}>
          <Button
            size="lg"
            onClick={clickHandler}
            fullWidth
            style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto', opacity: 0.8 }}
          >
            Read Story
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
