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
import dateFormat from '../../utils/dateFormat';

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
    console.log('post length', posts.length);
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
    console.log('hello');
    console.log(posts);
    if (posts.length > 0) {
      console.log('in posts length greater than zero');
      // if last post was posted by logged in user, set userLastPosted to true
      if (posts[posts.length - 1]?.created_by_user_id === Cookies.get('userId')) {
        console.log('user last posted is true');
        setUserLastPosted(true);
      } else {
        console.log('user last posted is false');
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

        {/* <p>
            Your character just went on an adventure.
            Please wait until the next round to post as a character.
          </p> */}

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
        <>
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
                <CardBody>
                  {/* controls font color */}
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {post.narrator_image_url
                        ? (
                          <img
                            src={post.narrator_image_url}
                            alt={post.narrator_image_id}
                            className="h-96 object-contain m-0 object-cover"
                            style={{ height: '40vh', width: '100%', borderRadius: '25px' }}
                          />
                        )
                        : null}
                    </div>
                    {post.narrator_post && (
                    <div
                      style={{ display: 'flex', justifyContent: 'left', fontFamily: 'serif' }}
                      className="mt-4"
                    >
                      The Narrator Continued the Story...
                    </div>
                    )}

                    {post.narrator_post === false
                      ? (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'left' }}>
                            <p style={{ fontFamily: 'serif', marginBottom: '5px' }}>
                              {post.char_name}
                            </p>
                          </div>
                          <div
                            style={{
                              fontFamily: 'serif', maxWidth: '150px',
                            }}
                            className="text-sm text-[#666]"
                          >
                            by
                            {' '}
                            {post.username}
                            {' '}
                            on
                            {' '}

                            {new Date(post.date_created).toLocaleString()}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'left' }}>
                            <br />
                            {post.char_image_url
                              ? (
                                <img
                                  src={post.char_image_url}
                                  alt={post.char_id}
                                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                                  size="l"
                                  className="hover:cursor-pointer mt-4"
                                  onClick={() => playAudio2(`https://docs.google.com/uc?export=open&id=${post.char_sound_url}`)}
                                />
                              )
                              : (
                                null
                              )}
                          </div>
                        </>
                      ) : (
                        null
                      )}

                    <br />
                    {/* parent container for the character image and username */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      overflowWrap: 'break-word',
                      gap: '0',
                      margin: '0',
                      padding: '0',
                      position: 'relative',
                      alignItems: 'flex-start',
                    }}
                    >
                      {/* This div is responsible for the text of the title/body of post */}
                      <div
                        style={{
                          fontFamily: 'serif',
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          maxWidth: '60%',
                          width: '100%',
                          maxHeight: '50vh',
                          height: 'auto',
                          margin: '0',
                          padding: '0',
                          textWrap: 'wrap',
                          overflowY: 'scroll',
                          wordBreak: 'break-all',
                        }}
                      >
                        <div style={{ marginLeft: '10px' }}>
                          <div style={{
                            fontSize: '36px',
                            marginRight: '0',
                            padding: '0',
                            backgroundImage: `url(${initialLetter})`,
                            backgroundSize: '55px',
                            color: '#2A0134',
                            border: '2px solid #2A0134',
                            float: 'left',
                          }}
                          >
                            {post.content.charAt(0)}
                          </div>
                          <p style={{ display: 'inline' }}>{post.content.slice(1)}</p>
                        </div>
                      </div>
                      <br />
                      {/* <audio className="player" controls preload="none">
                    <source src={`https://docs.google.com/uc?export=open&id=${post.sound_url}`} type="audio/mp3" />
                  </audio> */}

                      {/* This div is responsible for the character icon  */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                        paddingTop: '0',
                        marginTop: '0',
                      }}
                      >
                        {post.gif_url
                          ? (
                            <img
                              onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${post.sound_url}`)}
                              className="hover:cursor-pointer"
                              src={post.gif_url}
                              alt={post.gif_id}
                              style={{
                                height: 'auto',
                                width: '40%',
                                maxWidth: '40%',
                                margin: '0',
                                padding: '0',
                              }}
                            />
                          )
                          : null}
                      </div>
                    </div>
                    <Button
                      size="md"
                      onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${post.sound_url}`)}
                      style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto', opacity: 0.8 }}
                      className="mt-4"
                    >
                      Play Sound
                    </Button>

                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
const initialLetter = 'https://i.ibb.co/zsQsC1y/floral.png';
