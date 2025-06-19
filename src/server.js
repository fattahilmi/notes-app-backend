// npm run lint

import express from 'express';
import cors from 'cors';
// Importing the routes
import router from './routes.js';

const app = express();
const PORT = 5000;
const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json());

// Using the imported routes
app.use('/api', router);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Open your browser at http://${HOST}:${PORT}/api/notes`);
});