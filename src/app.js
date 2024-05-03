import express from 'express';
import api from './api/index.js';
import 'dotenv/config';
import cors from 'cors'; // Import cors

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'));

app.use(cors()); // Use cors middleware

app.use('/api/v1', api);

app.get('/api/instagram-key', (req, res) => {
  res.json({ key: process.env.INSTAGRAM_API_KEY });
});

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

export default app;
