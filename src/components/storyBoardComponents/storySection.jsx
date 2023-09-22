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

export default function StorySection() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storyId = location.pathname.split('/').pop();
  const posts = useSelector((state) => state.posts);
  const [audio] = useState(new Audio());
  const [userLastPosted, setUserLastPosted] = useState(false);
  const [userIsNarrator, setUserIsNarrator] = useState(false);
  const storyData = useSelector((state) => state.story.storyData);
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));
  const [username, setUsername] = useState([]);
  console.log('posts', posts);

  const findUsername = async (userID) => {
    axios.get(`/api/users/${userID}`)
      .then((results) => {
        // console.log('username found', results.data.username);
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
  console.log('all usernames', username);

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
    if (posts.lengh > 0) {
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
  }, [posts]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {userLastPosted === false && userIsNarrator === false ? (
          <Button
            size="lg"
            onClick={() => clickHandler(storyId)}
            style={{
              color: 'black',
              backgroundImage: `url(${buttonBG})`,
              backgroundSize: '150%',
              opacity: '0.8',
              width: '50%',
              margin: 'auto',
            }}
          >
            Create Character Post
          </Button>
        )
          : (
            <p>
              Your character just went on an adventure.
              Please wait until the next round to post again.
            </p>
          ) }
        {userLastPosted === false && userIsNarrator === true ? (
          <Button
            size="lg"
            onClick={() => clickHandler(storyId)}
            style={{
              color: 'black',
              backgroundImage: `url(${buttonBG})`,
              backgroundSize: '150%',
              opacity: '0.8',
              width: '90',
            }}
          >
            Create Narrator or Character Post
          </Button>
        )
          : (
            null
          ) }
        {userLastPosted === true && userIsNarrator === true ? (
          <Button
            size="lg"
            onClick={() => clickHandler(storyId)}
            style={{
              color: 'black',
              backgroundImage: `url(${buttonBG})`,
              backgroundSize: '150%',
              opacity: '0.8',
              width: '90%',
            }}
          >
            Create Narrator Post
          </Button>
        )
          : (
            null
          ) }
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
              <Card className="mt-6 w-96" style={{ width: '96%', backgroundImage: `url(${cardBG})` }}>
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
                            style={{height: '40vh', width: '100%' }}
                          />
                        )
                        : null}
                    </div>
                    {post.narrator_post === false
                      ? (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ fontFamily: 'serif', marginBottom: '5px' }}>
                              {post.char_name}
                            </p>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <br />
                            {post.char_image_url
                              ? (
                                <img
                                  src={post.char_image_url}
                                  alt={post.char_id}
                                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                                  size="l"
                                />
                              )
                              : null}
                          </div>
                        </>
                      ) : null }

                    <br />
                    {/* parent container for the character image and username */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      overflowWrap: 'break-word',
                      // overflowY: 'scroll',
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
                        // marginLeft: '40%',
                        // marginBottom: '40%',
                        // position: 'absolute',
                        // height: 'auto',
                      }}
                      >
                        {post.gif_url
                          ? (
                            <img
                              onMouseEnter={() => playAudio(`https://docs.google.com/uc?export=open&id=${post.sound_url}`)}
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
                        <p style={{ fontFamily: 'serif', marginBottom: '5px', marginTop: '5px', marginLeft: '10px', maxWidth: '150px' }}>
                          by
                          {' '}
                          {username[index]}
                          {' '}
                          on
                          {' '}

                          {new Date(post.date_created).toLocaleString()}
                        </p>
                      </div>
                    </div>
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
          </div>
        </>
      ))}
    </>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
const initialLetter = 'https://i.ibb.co/zsQsC1y/floral.png';
