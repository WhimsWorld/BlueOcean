import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Cookies from 'js-cookie';
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
        <Button className="max-w-xs">Select a Theme</Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {images.map((image) => (<MenuItem key={image.image_id + image.image_url}><img className="max-h-44" onClick={()=> setSelectedImage({image_url: image.image_url, image_id: image.image_id, category_id: image.category_id})} alt="" src={image.image_url} /></MenuItem>))}
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
        <Button className="max-w-xs">Select a Thumbnail</Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {images.map((image) => (<MenuItem key={image.thumbnail_id + image.thumbnail_url}><img className="max-h-12" onClick={()=> setSelectedThumbnail({thumbnail_url: image.thumbnail_url, thumbnail_id: image.thumbnail_id, category_id: image.category_id})} alt="" src={image.thumbnail_url} /></MenuItem>))}
      </MenuList>
    </Menu>
  );
}
function CategoryMenu({ selectedCategory, setSelectedCategory }) {
  const categories = ['High Fantasy', 'Mystic Forest', 'Pirates Cove', 'Steampunk Cityscape'];
  return (
    <Menu>
      <MenuHandler>
        <Button className="max-w-xs">{selectedCategory === '' ? "Select a Category" : selectedCategory}</Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {categories.map((category) => {
          return (<MenuItem onClick={()=> setSelectedCategory(category)}>{category}</MenuItem>)})}
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
    const categoryKey = {'High Fantasy': 1, 'Mystic Forest': 2, 'Pirates Cove': 3, 'Steampunk Cityscape': 4}
    if (title === '') {
      document.getElementById("setTitle").focus();
    } else if (summary === '') {
      document.getElementById("setSummary").focus();
    } else if (maxPlayers === '') {
      document.getElementById("selectPlayers").focus();
    } else if (selectedImage.image_id === undefined) {
      document.getElementById("selectImage").focus();
    } else if (selectedThumbnail.thumbnail_id === undefined) {
      document.getElementById("selectThumbnail").focus();
    } else if (selectedCategory === '') {
      document.getElementById("selectCategory").focus();
    } else {
      axios.post('/api/stories', {
        created_by_user_id: Cookies.get('userId'),
        category_id: categoryKey[selectedCategory],
        narrator_id: Cookies.get('userId'),
        main_image_id: selectedImage.image_id,
        thumbnail_id: selectedThumbnail.thumbnail_id,
        title,
        summary,
        max_characters: maxPlayers,
      }).then((res) => {
        navigate(`/storyBoard/${res.data.story_id}`);
      });
    }
  };
  return (
    <Card className="w-2/3 mt-1 p-4 flex">
      <Typography variant="h4" color="red" className="self-center">
        Create a new Story
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg ">
        <div className="mb-4 flex flex-col gap-6">
          <Input id="setTitle" size="lg" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea id="setSummary" variant="outlined" label="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <Input id="selectPlayers" type="number" label="Maximum Players" min="1" max="10" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} />
          <MenuWithScrollingContent id="selectImage" setSelectedImage={setSelectedImage} />
          {selectedImage.image_url !== '' ? <img alt="" className="max-h-44 object-contain self-start" src={selectedImage.image_url} /> : null}
          <ThumbnailMenu id="selectThumbnail" setSelectedThumbnail={setSelectedThumbnail} />
          {selectedThumbnail.thumbnail_url !== '' ? <img alt="" className="max-h-12 object-contain self-start" src={selectedThumbnail.thumbnail_url} /> : null}
          <CategoryMenu id="selectCategory" setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        </div>
        <Button type="submit" className="mt-6 w-1/2 max-w-xs self-center" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </Card>
  );
}
