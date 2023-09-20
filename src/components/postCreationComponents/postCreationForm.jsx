import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { auth } from '../../utils/firebase.js';

function ImagesMenu({ setSelectedImage }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/postsimages')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Menu>
      <MenuHandler>
        <Button>Select an Image</Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {images.map((image) => (<MenuItem key={image.image_id + image.image_url}><img onClick={() => setSelectedImage({ image_url: image.image_url, image_id: image.image_id, category_id: image.category_id })} alt="" src={image.image_url} /></MenuItem>))}
      </MenuList>
    </Menu>
  );
}

function GifsMenu({ setSelectedGif }) {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    axios.get('/api/postsgifs')
      .then((res) => {
        setGifs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Menu>
      <MenuHandler>
        <Button>Select a Gif</Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {gifs.map((gif) => (<MenuItem key={gif.gif_id + gif.gif_url}><img onClick={() => setSelectedGif({ gif_url: gif.gif_url, gif_id: gif.gif_id, category_id: gif.category_id })} alt="" src={gif.gif_url} /></MenuItem>))}
      </MenuList>
    </Menu>
  );
}

function SoundsMenu({ setSelectedSound }) {
  const [sounds, setSounds] = useState([]);
  useEffect(() => {
    axios.get('/api/postsounds')
      .then((res) => {
        setSounds(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Menu>
      <MenuHandler>
        <Button>Select a Sound</Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {sounds.map((sound) => (
          <MenuItem
            key={sound.sound_id}
            onClick={() => setSelectedSound({
              sound_url: sound.sound_url,
              sound_id:
              sound.sound_id,
              category_id: sound.category_id,
            })}
          >
            {sound.sound_id}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
export default function StoryCreationForm() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedSound, setSelectedSound] = useState({});
  const [selectedGif, setSelectedGif] = useState({});
  const storyId = useSelector((state) => state.story.storyId);
  const userId = 'user1_id';

  let uid;
  let displayName;
  fetchUser();
  async function fetchUser() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        displayName = user.displayName;
        // console.log('uid', uid);
        // console.log('display name:', displayName);
      } else {
        navigate('/login');
      }
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content === '') {
      document.getElementById('setContent').focus();
    } else if (selectedImage.image_id === undefined) {
      document.getElementById('selectImage').focus();
    } else if (selectedSound.sound_id === undefined) {
      document.getElementById('selectSound').focus();
    } else {
      axios.post('/api/posts', {
        created_by_user_id: userId,
        story_id: storyId,
        main_image_id: selectedImage.image_id,
        sound_id: selectedSound.sound_id,
        gif_id: selectedGif.gif_id,
        content,
      })
        .then((response) => {
          if (response.status === 201) {
            navigate(`/storyBoard/${storyId}`);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Card color="transparent" className="w-2/3 mt-1 p-4 flex">
      <Typography variant="h4" color="blue-gray" className="self-center">
        Create a new Post
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg ">
        <div className="mb-4 flex flex-col gap-6">
          <Textarea variant="outlined" label="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <ImagesMenu setSelectedImage={setSelectedImage} />
          {selectedImage.image_url !== '' ? <img alt="" src={selectedImage.image_url} /> : null}
          <GifsMenu setSelectedGif={setSelectedGif} />
          {selectedGif.gif_url !== '' ? <img alt="" src={selectedGif.gif_url} /> : null}
          <SoundsMenu setSelectedSound={setSelectedSound} />
          {selectedSound.sound_url !== undefined
            ? (
              <audio className="player" controls preload="none">
                <source src={`https://docs.google.com/uc?export=open&id=${selectedSound.sound_url}`} type="audio/mp3" />
              </audio>
            ) : null}
        </div>
        <Button type="submit" className="mt-6 w-1/2 self-center" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </Card>
  );
}
