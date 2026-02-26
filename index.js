import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Tracking System is running');
});

// to connect to mongodb and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});