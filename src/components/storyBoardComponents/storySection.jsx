import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Typography,
  Button,

} from '@material-tailwind/react';
import { fetchPostsById } from '../../app/slices/postsSlice';

export default function StorySection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storyId = useSelector((state) => state.story.storyId);
  const posts = useSelector((state) => state.posts);
  const [audio] = useState(new Audio());

  const clickHandler = (id) => {
    navigate(`/createPost/${id}`);
  };

  const playAudio = (soundUrl) => {
    audio.src = soundUrl;
    audio.play();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostsById(storyId));
    };
    setTimeout(() => {
      fetchPosts();
    }, 100);
  }, [storyId, dispatch, posts.length]);

  useEffect(() => {
  }, [posts]);

  return (
    <>
      <Button color="blue" type="button" onClick={() => clickHandler(storyId)}>Create Post</Button>
      {posts.map((post) => (
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              By
              {' '}
              {post.created_by_user_id}
              {' '}
              on
              {' '}
              {post.date_created}
              <br />
              {post.narrator_image_url
                ? (
                  <img
                    src={post.narrator_image_url}
                    alt={post.narrator_image_id}
                  />
                )
                : null}
              <br />
              Character:
              {' '}
              {post.char_name}
              <br />
              {post.char_image_url
                ? (
                  <img
                    src={post.char_image_url}
                    alt={post.char_id}
                  />
                )
                : null}
              <br />
              {post.gif_url
                ? (
                  <img
                    src={post.gif_url}
                    alt={post.gif_id}
                  />
                )
                : null}
              <br />
              {post.content}
              <br />
              {/* <audio className="player" controls preload="none">
                <source src={`https://docs.google.com/uc?export=open&id=${post.sound_url}`} type="audio/mp3" />
              </audio> */}
              <Button color="blue" type="button" onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${post.sound_url}`)}>Play Sound</Button>
            </Typography>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
