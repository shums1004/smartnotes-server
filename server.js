import express from 'express';
import mongoose from 'mongoose';
import { mongoURL, port, corsOptions } from './config.js';
import router from './routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use('/api', router);

// CORS configuration
app.use(cors({
  origin: corsOptions.origin,
  methods: corsOptions.methods,
  allowedHeaders: corsOptions.allowedHeaders,
}));

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