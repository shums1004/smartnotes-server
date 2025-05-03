import express from 'express';
import mongoose from 'mongoose';
import { mongoURL, port, corsOptions } from './config.js';
import router from './routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());


// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // optional, needed for cookies
}));

app.use('/api', router);

// MongoDB connection
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });