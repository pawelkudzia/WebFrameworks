import moment from 'moment';
import Base64Dto from '../dtos/base64Dto.js';
import ErrorMessageDto from '../dtos/errorMessageDto.js';

const json = (req, res) => {
    const jsonTestDto = {
        message: `API is working! Path: ${req.path}`,
        date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
    };

    res.status(200).json(jsonTestDto);
};

const plaintext = (req, res) => {
    const message = `API is working! Path: ${req.path}`;

    res.status(200).set('Content-Type', 'text/plain').send(message);
};

const base64 = (req, res) => {
    const message = req.query.message || 'This is default message.';

    const requiredMinLength = 3;
    const requiredMaxLenth = 25;

    if (message === null || message.length < requiredMinLength || message.length > requiredMaxLenth) {
        const errorMessageDto = new ErrorMessageDto(`'message' length must be between ${requiredMinLength} and ${requiredMaxLenth}.`);
        
        return res.status(400).json(errorMessageDto);
    }

    const base64Dto = new Base64Dto(message);

    res.status(200).json(base64Dto);
};

const testsController = {
    json,
    plaintext,
    base64
};

export default testsController;
