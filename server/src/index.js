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
  origin:["http://localhost:5173","https://eduzones.online"],
  credentials:true
}));


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(`mongodb://127.0.0.1:27017/Password`).then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('MongoDB connection error:', error);
  });

const port = 3002



app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
} )