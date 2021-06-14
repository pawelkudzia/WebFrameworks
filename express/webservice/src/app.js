import express from 'express';
import dotenv from 'dotenv';
import moment from 'moment';

// app init
dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

// endpoints
app.get('/api/json', (req, res) => {
    const date = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');

    const jsonTestDto = {
        message: `API is working! Path: ${req.path}`,
        date: date
    };

    res.status(200).json(jsonTestDto);
});

app.listen(port, () => console.log(`Server is running on port: ${port}.`));
