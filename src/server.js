// npm run lint

import express from 'express';
import cors from 'cors';
// Importing the routes
import router from './routes.js';

const app = express();
const PORT = 8200;

// Middleware
app.use(cors());
app.use(express.json());

// Using the imported routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});