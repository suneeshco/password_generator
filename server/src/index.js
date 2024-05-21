import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import cors from 'cors'
import 'dotenv/config';

const app = express()



app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin:true,
  credentials:true
}));


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('MongoDB connection error:', error);
  });

const port = process.env.PORT 



app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
} )