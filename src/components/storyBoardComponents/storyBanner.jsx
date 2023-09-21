import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { fetchStoryById } from '../../app/slices/storySlice';

export default function StoryBanner({ storyId }) {
  const dispatch = useDispatch();
  const [color, setColor] = useState('red');

  const story = useSelector((state) => state.story.storyData);

  useEffect(() => {
    if (storyId) {
      dispatch(fetchStoryById(storyId));
    }
  }, [dispatch, storyId]);

  if (!story) return null;

  const likeClickHandler = () => {
    const isLiked = color === 'red';

    const data = {
      storyId: story.story_id,
      userId: 'user3_id', // need to update this later
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
  };

  return (
    <Card className="w-full flex-row  max-w-screen-lg p-2 mt-4 shadow-lg justify-between items-center justify-self-center bg-cover" style={{ width: '96%', backgroundImage: `url(${cardBG})`, clipPath: 'polygon(59% 2%, 68% 3%, 75% 0, 83% 2%, 90% 3%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 96%, 63% 100%, 54% 96%, 44% 100%, 36% 100%, 30% 96%, 17% 98%, 7% 96%, 0 100%, 1% 71%, 0 43%, 1% 0, 9% 2%, 18% 0, 31% 3%, 48% 0)' }}>

      <CardBody className="flex flex-col p-2 self-start w-5/6 mx-auto mt-4">
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
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            {story.like_count}
          </Typography>
          <div>
            <img
              src={story.image_url}
              alt={story.title}
            />
          </div>
          <Typography variant="h4" color="blue-gray" className="font-medium">
            {story.title}
          </Typography>
        </div>
        <Typography color="gray">
          {story.date_created}
        </Typography>
        <Typography color="gray" className="text-justify mb-8">
          {story.summary}
        </Typography>
      </CardBody>
    </Card>
  );
}
const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
