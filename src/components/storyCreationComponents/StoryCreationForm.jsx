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
  Carousel,
  Avatar,
  Tooltip,
  Select,
  Option,
} from '@material-tailwind/react';
import { auth } from '../../utils/firebase.js';

function MenuWithScrollingContent({
  images, selectedCategory, selectedImage, setSelectedImage,
}) {
  const [filteredImages, setfilteredImages] = useState(images);
  useEffect(() => {
    if (selectedCategory === '') {
      setfilteredImages(images);
    } else {
      const filter = images.filter((image) => image.category_id === selectedCategory);
      setfilteredImages(filter);
    }
  }, [selectedCategory, images]);

  return (
    <div>
      <Typography style={{ fontSize: '20px' }} variant="h6" color="blue-gray" className="mb-4 font-croissant">
        Select Image
      </Typography>
      {filteredImages.length > 0 && (
        <Carousel
          className="rounded-xl mx-auto h-60"
          prevArrow={() => (<></>)}
          nextArrow={() => (<></>)}
        >
          {filteredImages.map((image) => (
            <button
              type="button"
              key={image.image_id}
              className="h-full w-full p-0 border-none bg-transparent cursor-pointer "
              onClick={() => setSelectedImage(image)}
              onKeyDown={(e) => handleKeyDown(e, image.id)}
            >
              <img
                src={image.image_url}
                alt={image.image_id}
                className={`h-full w-full object-cover ${selectedImage === image ? 'shadow-2xl shadow-orange-500  box-content border-y-2 border-orange-500 ' : ''}`}
                style={{ objectFit: 'cover', maxHeight: '96%' }}
              />
            </button>

          ))}
        </Carousel>
      )}
    </div>
  );
}

function ThumbnailMenu({ selectedCategory, setSelectedThumbnail }) {
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const catList = {
    1: 'High Fantasy', 2: 'Mystical Forest', 3: 'Pirates Cove Adventure', 4: 'Steampunk Cityscape',
  };
  useEffect(() => {
    axios.get('/api/storythumbnails')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleThumbnailClick = (image) => {
    setSelectedThumbnail({
      thumbnail_url: image.thumbnail_url,
      thumbnail_id: image.thumbnail_id,
      category_id: image.category_id,
    });
    setSelectedImageId(image.thumbnail_id);
  };

  return (
    <div>
      <Typography style={{ fontSize: '20px' }} variant="h6" color="blue-gray" className="mb-4 font-croissant">
        Select Thumbnail
      </Typography>
      {' '}
      <div className="flex gap-4">
        {images.map((image) => (
          <div key={image.thumbnail_id + image.thumbnail_url}>
            <Tooltip content={catList[image.thumbnail_id]}>
              <Avatar
                className={`max-h-12 cursor-pointer ${selectedImageId === image.thumbnail_id ? 'bg-gray-500 bg-opacity-50' : ''}`} // Apply border if selected
                onClick={() => handleThumbnailClick(image)}
                alt=""
                src={image.thumbnail_url}
              />

            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryMenu({ setSelectedCategory }) {
  const categories = ['High Fantasy', 'Mystic Forest', 'Pirates Cove', 'Steampunk Cityscape'];
  const categoryKey = {
    'High Fantasy': 1, 'Mystic Forest': 2, 'Pirates Cove': 3, 'Steampunk Cityscape': 4,
  };
  return (
    <div className="w-60">
      <Typography style={{ fontSize: '20px' }} variant="h6" color="blue-gray" className="mb-4 font-croissant">
        Select Categories
      </Typography>
      <Select label="Categories..." color="teal" style={{backgroundColor: '#FFFFFF3A'}}>
        {categories.map((category) => (
          <Option
            key={category}
            onClick={() => setSelectedCategory(categoryKey[category])}
            className="font-merienda"
          >
            {category}
          </Option>
        ))}
      </Select>
    </div>
  );
}
export default function StoryCreationForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    axios.get('/api/storyimages')
      .then((res) => {
        const filteredImages = res.data.filter((image) => image.category_id !== 5);
        setImages(filteredImages);
      })
      .catch((err) => console.log(err));
  }, []);
  let uid;
  let displayName;
  async function fetchUser() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        displayName = user.displayName;
      } else {
        navigate('/login');
      }
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetchUser();
    if (title === '') {
      document.getElementById('setTitle').focus();
    } else if (summary === '') {
      document.getElementById('setSummary').focus();
    } else if (maxPlayers === '') {
      document.getElementById('selectPlayers').focus();
    } else if (selectedImage.image_id === undefined) {
      document.getElementById('selectImage').focus();
    } else if (selectedThumbnail.thumbnail_id === undefined) {
      document.getElementById('selectThumbnail').focus();
    } else if (selectedCategory === '') {
      document.getElementById('selectCategory').focus();
    } else {
      axios.post('/api/stories', {
        created_by_user_id: Cookies.get('userId'),
        category_id: selectedCategory,
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
    <Card
      className="w-[60rem] flex p-28 mt-1 shadow-lg justify-between shadow-none items-center justify-self-center bg-cover"
      style={{ backgroundImage: `url(${StoryBg})`, backgroundColor: 'transparent' }}
    >

      <Typography variant="h4" color="blue-gray" className="self-center font-croissant mt-4">
        Create a new Story
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg font-merienda">
        <div className="mb-4 flex flex-col gap-6 bg-none">
          <Input
            id="setTitle"
            size="lg"
            label="Story Title"
            value={title}
            style={{backgroundColor: '#FFFFFF3A'}}
            onChange={(e) => setTitle(e.target.value)}
            color="teal"
          />
          <Textarea
            id="setSummary"
            variant="outlined"
            label="Summary"
            value={summary}
            style={{backgroundColor: '#FFFFFF3A'}}
            onChange={(e) => setSummary(e.target.value)}
            color="teal"
          />
          <Input
            id="selectPlayers"
            type="number"
            label="Maximum Players"
            min="1"
            max="10"
            value={maxPlayers}
            className="w-60"
            style={{backgroundColor: '#FFFFFF3A'}}
            color="teal"
            onChange={(e) => setMaxPlayers(e.target.value)}
          />
          <CategoryMenu id="selectCategory" setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <MenuWithScrollingContent id="selectImage" images={images} selectedCategory={selectedCategory} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <ThumbnailMenu id="selectThumbnail" selectedCategory={selectedCategory} setSelectedThumbnail={setSelectedThumbnail} />
        </div>
        <Button
          size="md"
          style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto' }}
          className="shadow-gray hover-shadow-sm hover:shadow-black hover:text-whimsiorange"
          type="submit"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </form>
    </Card>
  );
}

const StoryBg = 'https://i.ibb.co/FJtSp5B/scroll2.png';
const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
