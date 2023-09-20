// eslint-disable-next-line import/extensions
import * as postsModel from '../models/postsModel.js';

// eslint-disable-next-line import/prefer-default-export
export const getPosts = async (req, res) => {
  let storyId = null;
  if (req.params.storyId) {
    storyId = req.params.storyId;
  }
  try {
    const posts = await postsModel.getPosts(storyId);
    res.json(posts);
  } catch (err) {
    res.status(500).send('Error retrieving posts.');
  }
};

export const getChars = async (req, res) => {
  try {
    const chars = await postsModel.getChars();
    res.json(chars);
  } catch (err) {
    res.status(500).send('Error retrieving chars.');
  }
};

export const getThemeImages = async (req, res) => {
  try {
    const images = await postsModel.getThemeImages();
    res.json(images);
  } catch (err) {
    res.status(500).send('Error retrieving theme images.');
  }
};

export const getSounds = async (req, res) => {
  try {
    const sounds = await postsModel.getSounds();
    res.json(sounds);
  } catch (err) {
    res.status(500).send('Error retrieving sounds.');
  }
};

export const getGifs = async (req, res) => {
  try {
    const gifs = await postsModel.getGifs();
    res.json(gifs);
  } catch (err) {
    res.status(500).send('Error retrieving gifs.');
  }
};

export const addPost = async (req, res) => {
  const storyId = req.body.story_id;
  const userId = req.body.created_by_user_id;
  const charId = null;
  const imageId = req.body.main_image_id;
  const gifId = req.body.gif_id;
  const soundId = req.body.sound_id;
  console.log("This is the sound id", soundId);
  const { content } = req.body;
  const narratorPost = false;
  try {
    const post = await postsModel.addPost(
      storyId,
      userId,
      charId,
      gifId,
      soundId,
      imageId,
      narratorPost,
      content,
    );
    res.json(post);
  } catch (err) {
    res.status(500).send('Error adding post.');
  }
};
