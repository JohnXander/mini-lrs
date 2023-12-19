import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO_PATH)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  })

const app = express();
const PORT = process.env.PORT;

app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});