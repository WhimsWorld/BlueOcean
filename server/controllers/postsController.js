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

export const getAllData = async (req, res) => {
  const { storyid } = req.query;
  try {
    const data = await postsModel.getAllData(storyid);
    res.json(data);
  } catch (err) {
    res.status(500).send('Error retrieving data.');
  }
};

export const getNarrator = async (req, res) => {
  const { storyid, userid } = req.query;
  try {
    const data = await postsModel.getNarrator(storyid, userid);
    res.json(data);
  } catch (err) {
    res.status(500).send('Error retrieving data.');
  }
};

export const addPost = async (req, res) => {
  const {
    story_id, created_by_user_id, imageId, gifId, soundId, narratorPost, content,
  } = req.body;
  try {
    await postsModel.addPost(
      story_id,
      created_by_user_id,
      gifId,
      soundId,
      imageId,
      narratorPost,
      content,
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send('Error adding post.');
  }
};
