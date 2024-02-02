import express from 'express';
import db from './db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import serviceRouter from './routes/serviceRoutes.js';
import userRouter from './routes/userRoutes.js';
import expressAsyncHandler from 'express-async-handler';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db')
}).catch(err => {
    console.log(err.mesage);
});

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);

app.use('/api/services', serviceRouter);

app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.mesage });
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})