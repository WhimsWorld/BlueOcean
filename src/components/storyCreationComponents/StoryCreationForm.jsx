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
          className="rounded-xl mx-auto h-60 overflow-hidden"
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
  const [filtedimages, setFilteredImages] = useState([]);

  const [selectedImageId, setSelectedImageId] = useState(null);
  const catList = {
    1: 'High Fantasy', 2: 'Mystical Forest', 3: 'Pirates Cove Adventure', 4: 'Steampunk Cityscape',
  };
  useEffect(() => {
    axios.get('/api/gifs')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filter = images.filter((image) => image.category_id === selectedCategory);
    setFilteredImages(filter);
  }, [selectedCategory, images]);

  const handleThumbnailClick = (image) => {
    setSelectedThumbnail({
      gif_url: image.gif_url,
      gif_id: image.gif_id,
      category_id: image.category_id,
    });
    setSelectedImageId(image.gif_id);
  };

  return (
    <div>
      <Typography style={{ fontSize: '20px' }} variant="h6" color="blue-gray" className="mb-4 font-croissant">
        Select Thumbnail
      </Typography>
      {' '}
      <div className="flex flex-wrap">
        {filtedimages.map((image) => (
          <div key={image.gif_id + image.gif_url} className="w-1/6">
            <Avatar
              className={`max-h-12 cursor-pointer shadow-md hover:shadow-black ${selectedImageId === image.gif_id ? 'bg-gray-500 bg-opacity-50 shadow-black' : ''}`}
              onClick={() => handleThumbnailClick(image)}
              alt=""
              src={image.gif_url}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

function CategoryMenu({ setSelectedCategory }) {
  const categories = ['High Fantasy', 'Mystical Forest', 'Pirates Cove Adventure', 'Steampunk Cityscape'];
  const categoryKey = {
    'High Fantasy': 1, 'Mystical Forest': 2, 'Pirates Cove Adventure': 3, 'Steampunk Cityscape': 4,
  };
  const [selectedValue, setSelectedValue] = useState('High Fantasy');
  return (
    <div className="w-60">
      <Typography style={{ fontSize: '20px' }} variant="h6" color="blue-gray" className="mb-4 font-croissant">
        Select Categories
      </Typography>
      <Select label="Categories..." color="teal" style={{ backgroundColor: '#FFFFFF3A' }} value={selectedValue}>
        {categories.map((category) => (
          <Option
            key={category}
            value={category}
            onClick={() => {
              setSelectedCategory(categoryKey[category]);
              setSelectedValue(category);
            }}
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
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [maxError, setMaxError] = useState(false);

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
  const handleChange = (e) => {
    if (e.target.value < 11) {
      setMaxPlayers(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetchUser();
    setErrorMessage(false);
    console.log(selectedThumbnail);

    if (title === '') {
      document.getElementById('setTitle').focus();
    } else if (summary === '') {
      document.getElementById('setSummary').focus();
    } else if (maxPlayers === '') {
      document.getElementById('selectPlayers').focus();
    } else if (selectedImage.image_id === undefined) {
      setErrorMessage(true);
    } else if (selectedThumbnail.gif_id === undefined) {
      document.getElementById('selectThumbnail').focus();
    } else if (selectedCategory === '') {
      document.getElementById('selectCategory').focus();
    } else {
      axios.post('/api/stories', {
        created_by_user_id: Cookies.get('userId'),
        category_id: selectedCategory,
        narrator_id: Cookies.get('userId'),
        main_image_id: selectedImage.image_id,
        thumbnail_id: selectedThumbnail.gif_id,
        title,
        summary,
        max_characters: maxPlayers,
      }).then((res) => {
        navigate(`/storyBoard/${res.data.story_id}`);
        window.scrollTo(0, 0);
      });
    }
  };
  return (
    <Card
      className="w-[66rem] flex p-28 mt-1 shadow-lg justify-between shadow-none items-center justify-self-center bg-cover"
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
            style={{ backgroundColor: '#FFFFFF3A' }}
            onChange={(e) => setTitle(e.target.value)}
            color="teal"
          />
          <Textarea
            id="setSummary"
            variant="outlined"
            label="Summary"
            value={summary}
            style={{ backgroundColor: '#FFFFFF3A' }}
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
            style={{ backgroundColor: '#FFFFFF3A' }}
            color="teal"
            onChange={handleChange}
          />
          <CategoryMenu id="selectCategory" setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <MenuWithScrollingContent id="selectImage" images={images} selectedCategory={selectedCategory} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <ThumbnailMenu id="selectThumbnail" selectedCategory={selectedCategory} setSelectedThumbnail={setSelectedThumbnail} />
        </div>
        <Typography color="red" className="font-serif" style={{ minHeight: '16px', height: '16px' }}>
          {errorMessage ? 'Please select an image before submitting.' : ''}
        </Typography>
        <Button
          size="md"
          style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto' }}
          className="shadow-gray hover-shadow-sm hover:shadow-black hover:text-whimsiorange mb-12 mt-4"
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
