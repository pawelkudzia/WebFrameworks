import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import AppError from './utils/appError.js';
import database from './data/database.js';
import testsRouter from './routes/testsRouter.js';
import locationsRouter from './routes/locationsRouter.js';

const { ValidationError } = Sequelize;

// app init
dotenv.config({ path: '.env' });
const app = express();
const port = process.env.PORT || 5000;

// database init
await database.connect();

// middleware
app.use(express.json());

// api
app.use('/api', testsRouter);
app.use('/api/locations', locationsRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

// global error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof ValidationError) {
        error.statusCode = 400;
        error.status = 'fail';
    } else {
        error.statusCode = error.statusCode || 500;
        error.status = error.status || 'error';
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
});

// server
app.listen(port, () => console.log(`Server is running on port: ${port}.`));
