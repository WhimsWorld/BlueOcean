import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

// Controllers import
// eslint-disable-next-line import/extensions
import * as usersController from './controllers/usersController.js';
// eslint-disable-next-line import/extensions
import * as storiesController from './controllers/storiesController.js';
// eslint-disable-next-line import/extensions
import * as postsController from './controllers/postsController.js';
import * as chatController from './controllers/chatController.js';
import * as createStoryController from './controllers/createStoryController.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: 'true' },
    appType: 'custom',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);
  app.use(express.json());

  // API Handlers
  app.get('/api/users', usersController.getAllUsers);
  app.get('/api/users/:userId', usersController.getUserById);
  app.post('/api/users', usersController.addUser);
  app.patch('/api/users/:userId/premium', usersController.updateUserPremiumStatus);

  // select characters
  app.get('/api/characters', usersController.getCharacters);
  app.get('/api/characters/user/:userId', usersController.getCharactersByUserId);
  app.get('/api/characters/:storyId', usersController.getCharactersByStoryId);
  app.get('/api/characters/story/user', usersController.getCharactersByStoryIdUserId);
  app.post('/api/characters', usersController.addCharacter);

  // character creation
  app.get('/api/images', usersController.getImages);
  app.get('/api/sounds', usersController.getSounds);

  // story creation
  app.get('/api/storyimages', createStoryController.getAllThemeImages);
  app.get('/api/gifs', createStoryController.getAllGifs);
  app.post('/api/stories', createStoryController.addStory);

  // select stories
  app.get('/api/stories', storiesController.getStories);
  app.get('/api/categories', storiesController.getCategories);
  app.get('/api/leaderboard', storiesController.getLeaderboard);
  app.get('/api/search', storiesController.getSearch);
  app.get('/api/stories/:storyId', storiesController.getStoryById);
  app.get('/api/likes', storiesController.getLikedStories);
  app.get('/api/storyLikes', storiesController.getLikedStories);
  app.get('/api/category', storiesController.getCategory);
  app.post('/api/postlike', storiesController.postLikedStory);
  app.delete('/api/deletelike', storiesController.deleteLikedStory);
  app.get('/api/likes/:storyId', storiesController.getLikesByStoryId);
  app.get('/api/storiescharmax', storiesController.getMaxCharacters);
  app.get('/api/storiescharcount', storiesController.getCharactersCount);

  // story posts
  app.get('/api/posts/:storyId', postsController.getPosts);
  app.get('/api/getData', postsController.getAllData);
  app.get('/api/getNarrator', postsController.getNarrator);
  app.post('/api/posts', postsController.addPost);

  // chat handlers
  app.post('/api/chat', chatController.postMessage);
  app.get('/api/chat/story/:storyId', chatController.getChatByStory);

  app.use('/api/*', (req, res, next) => {
    res.status(404).send('Not Found');
  });

  // Serve the index.html with SSR
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(path.join(__dirname, '..'), 'index.html'),
        'utf-8',
      );

      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
}

createServer();
