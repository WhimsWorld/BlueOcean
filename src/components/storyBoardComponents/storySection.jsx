import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Avatar,

} from '@material-tailwind/react';
import axios from 'axios';
import { fetchPostsById } from '../../app/slices/postsSlice';
import { fetchStoryById } from '../../app/slices/storySlice';
import moment from 'moment';

export default function StorySection() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storyId = location.pathname.split('/').pop();
  const posts = useSelector((state) => state.posts);
  const [audio] = useState(new Audio());
  const [audio2] = useState(new Audio());
  const [userLastPosted, setUserLastPosted] = useState(false);
  const [userIsNarrator, setUserIsNarrator] = useState(false);
  const storyData = useSelector((state) => state.story.storyData);
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));
  const [username, setUsername] = useState([]);
  const [userID, setUserID] = useState(Cookies.get('userId'));
  const [hasCharInStory, setHasCharInStory] = useState(false);

  const findUsername = async (userID) => {
    axios.get(`/api/users/${userID}`)
      .then((results) => {
        setUsername([...username, results.data.username]);
      })
      .catch((err) => console.log('err', err));
  };
  useEffect(() => {
    for (let i = 0; i < posts.length; i += 1) {
      findUsername(posts[i].created_by_user_id);
    }
  }, [posts]);

  const clickHandler = (id) => {
    if (loggedIn) {
      navigate(`/createPost/${id}`);
    } else {
      navigate(`/login/storyBoard/${storyId}`);
    }
  };

  const playAudio = (soundUrl) => {
    audio.src = soundUrl;
    audio.play();
  };

  const playAudio2 = (soundUrl) => {
    audio2.src = soundUrl;
    audio2.play();
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
    if (storyId) {
      dispatch(fetchStoryById(storyId));
    }
  }, [dispatch, storyId]);

  useEffect(() => {
    const dataParams = {
      params: {
        storyID: storyId,
        userID,
      },
    };
    axios.get('/api/characters/story/user', dataParams)
      .then((characterData) => {
        if (characterData.data.char_id === undefined) {
          setHasCharInStory(false);
        } else {
          setHasCharInStory(true);
        }
      })
      .catch(() => console.log('couldnt fetch characters'));
  }, [storyId, userID]);

  useEffect(() => {
    if (posts.length > 0) {
      // if last post was posted by logged in user, set userLastPosted to true
      if (posts[posts.length - 1]?.created_by_user_id === Cookies.get('userId')) {
        setUserLastPosted(true);
      } else {
        setUserLastPosted(false);
      }
    } else {
      setUserLastPosted(false);
    }
    if (storyData?.created_by_user_id === Cookies.get('userId')) {
      setUserIsNarrator(true);
    } else {
      setUserIsNarrator(false);
    }
  }, [posts.length, posts]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasCharInStory === false && userIsNarrator === false ? (
          <p style={{marginLeft: '20px', marginRight: '10px', marginTop: '20px'}} className='font-croissant'>
            Please create a character to join this story.
          </p>
        ) : (
          null
        )}
        {userLastPosted === false && hasCharInStory === true && userIsNarrator === false ? (
          <Button
            onClick={() => clickHandler(storyId)}
            style={{
              backgroundImage: `url(${buttonBG})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              opacity: '0.8',
              width: '200px',
            }}
            className="mt-4 mb-4 w-1/2 self center font-croissant text-md shadow-gray hover-shadow-sm hover:shadow-black hover:text-whimsiorange"
          >
            Create Post
          </Button>
        ) : (
          null
        )}
        {userLastPosted === true && hasCharInStory === true && userIsNarrator === false ? (
          <p style={{marginLeft: '20px', marginRight: '10px', marginTop: '20px'}} className='font-croissant'>
            Your character just went on an adventure.
            Please wait until the next round to post again.
          </p>
        ) : (
          null
        )}

        {userLastPosted === false && userIsNarrator === true && hasCharInStory === true ? (
          <Button
            onClick={() => clickHandler(storyId)}
            style={{
              backgroundImage: `url(${buttonBG})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              opacity: '0.8',
              width: '200px',
            }}
            className="mt-4 mb-4 w-1/2 self center font-croissant text-md shadow-gray hover-shadow-sm hover:shadow-black hover:text-whimsiorange"
          >
            Create Post
          </Button>
        )
          : (
            null
          )}
        {(userLastPosted === true && userIsNarrator === true)
        || (userLastPosted === false && userIsNarrator === true && hasCharInStory === false) ? (
          <Button
            onClick={() => clickHandler(storyId)}
            style={{
              backgroundImage: `url(${buttonBG})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              opacity: '0.8',
              width: '200px',
            }}
            className="mt-4 mb-4 w-1/2 self center font-croissant text-md shadow-gray hover-shadow-sm hover:shadow-black hover:text-whimsiorange"
          >
            Create Post
          </Button>
          )
          : (
            null
          )}
      </div>
      {posts.map((post, index) => (
        <div key={post.post_id}>
          {posts.length - 1 === index ? (
            <div>
              {/* <h1 id="recent"> </h1> // what does this do? */}
            </div>
          ) : null }
          <div key={post.post_id} className="w-full flex-row p-2 mt-4 shadow-lg justify-between items-center justify-self-center bg-cover" style={{ width: '98%', backgroundImage: `url(${cardBG})`, clipPath: 'polygon(100% 2%, 68% 2%, 75% 0, 83% 2%, 90% 2%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 98%, 63% 100%, 54% 98%, 44% 100%, 36% 100%, 30% 98%, 17% 99%, 7% 98%, 0 100%, 1% 71%, 0 43%, 1% 2%, 9% 2%, 18% 0, 31% 2%, 48% 0)' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                className="flex flex-col p-2 self-start w-5/6 m-0 p-0"
                style={{
                  height: 'auto', width: '200%', backgroundImage: `url(${cardBG})`, background: 'no-repeat', clipPath: 'polygon(100% 2%, 68% 2%, 75% 0, 83% 2%, 90% 2%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 98%, 63% 100%, 54% 98%, 44% 100%, 36% 100%, 30% 98%, 17% 99%, 7% 98%, 0 100%, 1% 71%, 0 43%, 1% 2%, 9% 2%, 18% 0, 31% 2%, 48% 0)',
                }}
              >
                {/* This card body is responsible for what is located on an story post card */}
                <CardBody className="flex flex-col p-2 self-start w-5/6 mx-auto mt-4">
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {post.narrator_image_url
                        ? (
                          <img
                            src={post.narrator_image_url}
                            alt={post.narrator_image_id}
                            className="mb-6 h-96 object-contain m-0 object-cover"
                            style={{ height: '40vh', maxHeight: '00px', width: '100%', borderRadius: '25px' }}
                          />
                        )
                        : null}
                    </div>
                    {post.narrator_post && (
                      <div className="flex items-center justify-between">
                        <div className="flex-grow">
                          <Typography variant="h4" color="blue-gray" className="text-xxl font-croissant font-medium">
                            The Narrator Continued the Story...
                          </Typography>
                        </div>
                        <Avatar
                          onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${post.sound_url}`)}
                          className={post.sound_url ? 'hover:cursor-pointer' : 'none'}
                          src={post.gif_url}
                          alt={post.gif_id}
                          size="md"
                        />
                      </div>
                    )}
                    {post.narrator_post === false
                      ? (
                        <div className="flex items-center gap-4 justify-between">
                          <div className="flex items-center">
                            {post.char_image_url && (
                              <Avatar
                                src={post.char_image_url}
                                alt={post.char_id}
                                size="xxl"
                                className={post.char_sound_url ? 'hover:cursor-pointer' : 'none'}
                                onClick={() => playAudio2(`https://docs.google.com/uc?export=open&id=${post.char_sound_url}`)}
                              />
                            )}
                            <div className="flex flex-col ml-4">
                              <Typography style={{ fontSize: '28px' }} className="mb-2 text-lg font-croissant font-medium">
                                {post.char_name}
                              </Typography>
                              <div
                                style={{
                                  fontFamily: 'serif',
                                  maxWidth: '150px',
                                }}
                                className="text-sm text-[#666]"
                              >
                                by {post.username}
                                <br />
                                on {moment(post.date_created).format('MMM Do, YYYY')}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {post.gif_url && post.sound_url ? (
                              <Avatar
                                onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${post.sound_url}`)}
                                className="hover:cursor-pointer"
                                src={post.gif_url}
                                alt={post.gif_id}
                                size="md"
                              />
                            ) : null}
                          </div>
                        </div>
                      )
                      : null}
                    <br />
                  </Typography>
                  <div
                    style={{
                      fontFamily: 'serif',
                      fontSize: '18px',
                    }}
                    className="min-w-40"
                  >
                    <div style={{ marginLeft: '2px' }}>
                      <Typography id="specialParagraph" className="pt-4 -mt-8 mb-4 font-karla text-lg w-full">{post.content}</Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
