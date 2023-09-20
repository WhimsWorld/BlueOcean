import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { fetchPostsById } from '../../app/slices/postsSlice';

export default function StorySection() {
  const dispatch = useDispatch();
  const storyId = useSelector((state) => state.story.storyId);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostsById(storyId));
      console.log(posts);
    };
    setTimeout(() => {
      fetchPosts();
    }, 100);
  }, [storyId, dispatch, posts.length]);

  useEffect(() => {
    console.log('posts changed to ', posts);
  }, [posts]);

  return (
    <>
      {posts.map((post) => (
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Story Section
              {post.content}
              <audio className="player" controls preload="none">
                <source src={`https://docs.google.com/uc?export=open&id=${post.sound_url}`} type="audio/mp3" />
              </audio>
            </Typography>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
