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

  // select characters
  app.get('/api/characters', usersController.getCharacters);
  app.get('/api/characters/user/:userId', usersController.getCharactersByUserId);
  app.post('/api/characters', usersController.addCharacter);

  // select stories
  app.get('/api/stories', storiesController.getStories);
  app.get('/api/categories', storiesController.getCategories);
  app.get('/api/leaderboard', storiesController.getLeaderboard);
  app.get('/api/search', storiesController.getSearch);

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
