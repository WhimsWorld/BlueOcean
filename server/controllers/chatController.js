import * as chatModel from '../models/chatModel.js';

export const postMessage = async (req, res) => {
  const { userId, storyId, data } = req.body;

  try {
    const message = await chatModel.addMessage(userId, storyId, data);
    res.json(message);
  } catch (err) {
    res.status(500).send('Error adding chat message.');
  }
};

export const getChatByStory = async (req, res) => {
  const { storyId } = req.params;

  try {
    const messages = await chatModel.getMessagesByStoryId(storyId);
    res.json(messages);
  } catch (err) {
    res.status(500).send('Error retrieving chat messages.');
  }
};
