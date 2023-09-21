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
      <Button
        size="lg"
        onClick={() => clickHandler(storyId)}
        style={{
          color: 'black',
          backgroundImage: `url(${buttonBG})`,
          backgroundSize: 'auto',
          opacity: '0.8',
          width: '98%',
        }}
      >
        Create Post

      </Button>
      {posts.map((post, index) => (
        <div className="w-full flex-row p-2 mt-4 shadow-lg justify-between items-center justify-self-center bg-cover" style={{ width: '96%', backgroundImage: `url(${cardBG})`, clipPath: 'polygon(100% 2%, 68% 2%, 75% 0, 83% 2%, 90% 2%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 98%, 63% 100%, 54% 98%, 44% 100%, 36% 100%, 30% 98%, 17% 99%, 7% 98%, 0 100%, 1% 71%, 0 43%, 1% 2%, 9% 2%, 18% 0, 31% 2%, 48% 0)' }}>

          <Card className="mt-6 w-96" style={{ width: '96%', backgroundImage: `url(${cardBG})` }} key={post.post_id}>
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
                {post.char_name}
                <br />
                {post.char_image_url
                  ? (
                    <img
                      src={post.char_image_url}
                      alt={post.char_id}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
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
                <Button
                  size="md"
                  onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${post.sound_url}`)}
                  style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto', opacity: 0.8 }}
                >
                  Play Sound

                </Button>
              </Typography>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
