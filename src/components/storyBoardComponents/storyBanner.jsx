import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import moment from 'moment';
import Cookies from 'js-cookie';
import axios from 'axios';
import { fetchStoryById } from '../../app/slices/storySlice';

export default function StoryBanner({ storyId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = Cookies.get('userId');
  const [color, setColor] = useState('white');
  const [likedByUser, setLikedByUser] = useState(false);
  const story = useSelector((state) => state.story.storyData);
  const [likeCount, setLikeCount] = useState(story ? story.like_count : 0);
  const [likedStories, setLikedStories] = useState({});
  useEffect(() => {
    const dataParams = {
      params: {
        userId,
      },
    };
    axios.get('/api/likes', dataParams)
      .then((response) => {
        setLikedStories(response.data);
      })
      .catch(() => {});
  }, [userId]);

  useEffect(() => {
    if (storyId) {
      dispatch(fetchStoryById(storyId));
    }
  }, [dispatch, storyId]);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`/api/likes/${storyId}`);
      setLikedByUser(checkIfLikedByUser(response.data));
      setLikeCount(response.data.length);
    } catch (err) {
    }
  };

  const checkIfLikedByUser = (likes) => !!likes.find((like) => like.user_id === userId);

  useEffect(() => {
    fetchLikes();
  }, []);

  const likeClickHandler = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const apiEndpoint = likedByUser ? '/api/deletelike' : '/api/postlike';
    const data = {
      storyId: story.story_id,
      userId,
    };

    try {
      await axios({
        method: likedByUser ? 'DELETE' : 'POST',
        url: apiEndpoint,
        data,
      });
      fetchLikes();
    } catch (error) {
      console.log(error);
    }
  };

  if (!story) return null;

  return (
    <Card className="w-full flex-row p-2 mt-4 shadow-lg justify-between items-center justify-self-center bg-cover mx-3 mt-5" style={{ width: '96%', backgroundImage: `url(${cardBG})`, clipPath: 'polygon(59% 2%, 68% 3%, 75% 0, 83% 2%, 90% 3%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 96%, 63% 100%, 54% 96%, 44% 100%, 36% 100%, 30% 96%, 17% 98%, 7% 96%, 0 100%, 1% 71%, 0 43%, 1% 0, 9% 2%, 18% 0, 31% 3%, 48% 0)' }}>

      <CardBody className="flex flex-col p-2 self-start w-5/6 mx-auto mt-4">
        <div className="flex flex-col">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <IconButton
              onClick={likeClickHandler}
              size="sm"
              variant="text"
              className="!absolute top-2 right-5 rounded-full items-center bg-transparent z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={likedByUser ? '#F9A03F' : 'white'}
                className="h-6 w-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
            <div
              className="!absolute text-gray-200 top-0 right-0 pt-[3px] pr-[10px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              style={{ marginRight: likeCount > 10 ? '40px' : '30px' }}
            >
              {likeCount}
            </div>
          </div>
          <div className="pb-6">
            <img
              src={story.image_url}
              alt={story.title}
              className="h-96 object-contain m-0 object-cover relative"
              style={{ height: '50vh', maxHeight: '400px', width: '100%', borderRadius: '25px' }}
            />
          </div>
          <Typography variant="h4" className="text-xxl font-croissant font-bold">
            {story.title}
          </Typography>
        </div>
        <Typography color="gray">
          {moment(story.date_created).format('MMM Do, YYYY')}
        </Typography>
        <Typography color="gray" className="text-justify mb-12" style={{ font: 'serif' }}>
          {story.summary}
        </Typography>
      </CardBody>
    </Card>
  );
}
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
