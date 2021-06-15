import express from 'express';
import dotenv from 'dotenv';
import AppError from './utils/appError.js';
import database from './data/database.js';
import testsRouter from './routes/testsRouter.js';
import locationsRouter from './routes/locationsRouter.js';

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
app.use('/api/locations', locationsRouter);

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
const server = app.listen(port, () => console.log(`Server is running on port: ${port}.`));

process.on('SIGINT', () => {
    database.sequelize.close().then(() => console.log('Database connection was closed.'));
    server.close(() => console.log(`Server on port: ${port} was closed.`));
});
