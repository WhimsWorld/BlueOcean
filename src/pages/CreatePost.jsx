import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Textarea,
  Button,
  Typography,
  Switch,
  Checkbox,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import StickyNavbar from '../components/StickyNavbar';
import ImagesMenu from '../components/postCreationComponents/ImagesMenu';
import GifsMenu from '../components/postCreationComponents/GifsMenu';
import SoundsMenu from '../components/postCreationComponents/SoundsMenu';

export default function CreatePost() {
  const navigate = useNavigate();
  const [checkNarrator, setCheckNarrator] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [images, setImages] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSound, setSelectedSound] = useState('');
  const [selectedGif, setSelectedGif] = useState('');
  const [loc, setLoc] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const storyId = useSelector((state) => state.story.storyId);
  const [userID, setUserID] = useState(Cookies.get('userId'));
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));

  useEffect(() => {
    setSelectedImage(null);
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(switchState);
  }, [switchState]);

  useEffect(() => {
    const location = window.location.href.split('Post/');
    setLoc(Number(location[1]));
    const dataParams = {
      params: {
        storyid: storyId || Number(location[1]),
        userid: userID,
      },
    };
    const dataUser = {
      params: {
        storyid: storyId || Number(location[1]),
        userid: userID,
      },
    };
    axios.get('/api/getNarrator', dataUser)
      .then((res) => {
        setCheckNarrator(res.data);
      })
      .catch((err) => console.log(err));
    axios.get('/api/getData', dataParams)
      .then((res) => {
        setSounds(res.data.newDataObject.sounds);
        setImages(res.data.newDataObject.images);
        setGifs(res.data.newDataObject.gifs);
      })
      .catch((err) => console.log(err));
  }, [userID, storyId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content === '') {
      document.getElementById('setContent').focus();
    } else {
      axios.post('/api/posts', {
        created_by_user_id: userID,
        story_id: storyId || loc,
        imageId: selectedImage || null,
        soundId: selectedSound.id || null,
        gifId: selectedGif || null,
        narratorPost: switchState,
        content,
      })
        .then((response) => {
          if (response.status === 201) {
            const link = storyId || loc;
            navigate(`/storyBoard/${link}`);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSwitchToggle = () => {
    setSwitchState((prevState) => !prevState);
  };

  const clickHandler = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true);
  };

  return (
    <div style={{ backgroundImage: `url(${right})` }}>
      <StickyNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh',
      }}
      >
        <Card
          color="transparent"
          className="w-2/3 mt-1 p-4 flex"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            background: `url(${cardBG})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            clipPath: 'polygon(59% 2%, 68% 3%, 75% 0, 83% 2%, 90% 3%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 96%, 63% 100%, 54% 96%, 44% 100%, 36% 100%, 30% 96%, 17% 98%, 7% 96%, 0 100%, 1% 71%, 0 43%, 1% 0, 9% 2%, 18% 0, 31% 3%, 48% 0)',
          }}
        >
          <div style={{ marginTop: '2em', display: 'flex', gap: '10em' }}>
            <Typography variant="h4" color="blue-gray" className="self-center" style={{ marginLeft: checkNarrator ? '20rem' : 'none' }}>
              Create Post
            </Typography>
            {checkNarrator ? (
              <div className="flex w-max gap-4">
                <Switch label="Narrator Post" style={{ backgroundColor: switchState ? '#98BAD5' : 'white' }} checked={switchState} onChange={handleSwitchToggle} />
              </div>
            ) : null}
          </div>
          <div style={{ width: '80%', marginTop: '1em' }}>
            <Textarea
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </div>
          <div style={{ marginTop: '1em', width: '80%' }}>
            <div style={{ display: 'flex', gap: '7em' }}>
              <div style={{
                width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              >
                <Typography style={{ fontSize: '20px' }} variant="h6" color="blue-gray" className="mb-4">
                  Select Sticker
                </Typography>
                <GifsMenu gifs={gifs} selectedGif={selectedGif} setSelectedGif={setSelectedGif} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                <SoundsMenu style={{ marginLeft: '30px' }} sounds={sounds} setSelectedSound={setSelectedSound} />
                {selectedSound.url !== undefined ? (
                  <audio className="player" controls preload="none">
                    <source src={`https://docs.google.com/uc?export=open&id=${selectedSound.url}`} type="audio/mp3" />
                  </audio>
                ) : null}
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            {switchState ? (
              <div style={{ display: 'flex', marginTop: '2em' }}>
                <Typography style={{ fontSize: '20px' }} variant="h6" color="blue-gray" className="mb-4">
                  Select Image
                </Typography>
                <div style={{ marginTop: '-6px', marginLeft: '10px' }}>
                  <Checkbox
                    label="Include Image"
                    color="indigo"
                    checked={isChecked}
                    onClick={clickHandler}
                    style={{ backgroundColor: isChecked ? '#98BAD5' : 'white' }}
                  />
                </div>
              </div>
            ) : null}
            {switchState ? (
              <div style={{ height: isChecked ? '300px' : null }}>
                {isChecked ? (
                  <ImagesMenu images={images} setSelectedImage={setSelectedImage} />
                ) : null}
              </div>
            ) : null}
            <Button
              style={{
                marginBottom: '80px',
                backgroundImage: `url(${buttonBG})`,
                backgroundSize: 'auto',
                opacity: 0.8,
                fontSize: '18px',
                color: 'white',
                width: '350px',
              }}
              type="submit"
              className="mt-6 w-1/2 self-center"
              onClick={handleSubmit}
            >
              Continue the Story
            </Button>
          </div>
        </Card>

      </div>
    </div>

  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
const right = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695192325/image_uot0j6.png';
