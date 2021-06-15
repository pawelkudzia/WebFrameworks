import express from 'express';
import dotenv from 'dotenv';
import AppError from './utils/appError.js'
import testsRouter from './routes/testsRouter.js';
import database from './data/database.js';

// app init
dotenv.config({ path: '.env' });
const app = express();
const port = process.env.PORT || 5000;

// database init
database.connect();

// middleware
app.use(express.json());

// api
app.use('/api', testsRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

// global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// server
app.listen(port, () => console.log(`Server is running on port: ${port}.`));
