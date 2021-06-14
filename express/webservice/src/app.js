import express from 'express';
import dotenv from 'dotenv';
import moment from 'moment';
import Base64Dto from './dtos/base64Dto.js';
import ErrorMessageDto from './dtos/errorMessageDto.js';

// app init
dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

// endpoints
app.get('/api/json', (req, res) => {
    const date = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    const jsonTestDto = { message: `API is working! Path: ${req.path}`, date: date };

    res.status(200).json(jsonTestDto);
});

app.get('/api/plaintext', (req, res) => {
    const message = `API is working! Path: ${req.path}`;

    res.status(200).set('Content-Type', 'text/plain').send(message);
});

app.get('/api/base64', (req, res) => {
    const message = req.query.message ? req.query.message : 'This is default message.';

    const requiredMinLength = 3;
    const requiredMaxLenth = 25;

    if (message === null || message.length < requiredMinLength || message.length > requiredMaxLenth) {
        const errorMessageDto = new ErrorMessageDto(`'message' length must be between ${requiredMinLength} and ${requiredMaxLenth}.`);

        return res.status(400).json(errorMessageDto);
    }

    const base64Dto = new Base64Dto(message);

    res.status(200).json(base64Dto);
});

app.listen(port, () => console.log(`Server is running on port: ${port}.`));
