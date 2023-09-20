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
import { auth } from '../../utils/firebase.js';
function MenuWithScrollingContent({ setSelectedImage }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios.get('/api/storyimages')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Menu>
      <MenuHandler>
        <Button>Select a Theme</Button>
      </MenuHandler>
      <MenuList classname="max-h-96">
        {images.map((image) => {
          return (<MenuItem key={image.image_id + image.image_url}><img onClick={()=> setSelectedImage({image_url: image.image_url, image_id: image.image_id, category_id: image.category_id})} alt="" src={image.image_url} /></MenuItem>);
        })}
      </MenuList>
    </Menu>
  );
}
function ThumbnailMenu({ setSelectedThumbnail }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios.get('/api/storythumbnails')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Menu>
      <MenuHandler>
        <Button>Select a Thumbnail</Button>
      </MenuHandler>
      <MenuList>
        {images.map((image) => {
          return (<MenuItem key={image.thumbnail_id + image.thumbnail_url}><img onClick={()=> setSelectedThumbnail({thumbnail_url: image.thumbnail_url, thumbnail_id: image.thumbnail_id, category_id: image.category_id})} alt="" src={image.thumbnail_url} /></MenuItem>);
        })}
      </MenuList>
    </Menu>
  );
}

export default function StoryCreationForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedThumbnail, setSelectedThumbnail] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  let uid;
  let displayName;
  async function fetchUser() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        displayName = user.displayName;
        console.log('uid', uid);
        console.log('display name:', displayName);
      } else {
        navigate('/login');
      }
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
    axios.post('/api/stories', {
      created_by_user_id: 'user1_id',
      category_id: selectedCategory,
      narrator_id: 'user1_id',
      main_image_id: selectedImage.image_id,
      thumbnail_id: selectedThumbnail.thumbnail_id,
      title: title,
      summary: summary,
      max_characters: maxPlayers,
    }).then((error) => {
      return console.log(error);
    });
  };
  return (
    <Card color="transparent" className="w-2/3 mt-1 p-4 flex">
      <Typography variant="h4" color="blue-gray" className="self-center">
        Create a new Story
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg ">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea variant="outlined" label="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <Input type="number" label="Maximum Players" min="1" max="10" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} />
          <MenuWithScrollingContent setSelectedImage={setSelectedImage} />
          {selectedImage.image_url !== '' ? <img alt="" src={selectedImage.image_url} /> : null}
          <ThumbnailMenu setSelectedThumbnail={setSelectedThumbnail} />
          <Input type="number" label="Select a Theme" min="1" max="5" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} />
        </div>
        <Button type="submit" className="mt-6 w-1/2 self-center" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </Card>
  );
}
// import { useNavigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../utils/firebase';
// import StickyNavbar from '../components/StickyNavbar';

// export default function SimpleRegistrationForm() {
//   const navigate = useNavigate();

//   const [storyTitle, setStoryTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [participants, setParticipants] = useState(1);
