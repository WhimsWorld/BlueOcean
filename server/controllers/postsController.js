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
