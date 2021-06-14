import Base64 from '../utils/base64.js';

class Base64Dto {
    constructor(message) {
        this.message = message;
        this.encodedMessage = Base64.encode(this.message);
        this.decodedMessage = Base64.decode(this.encodedMessage);
    }
}

export default Base64Dto;
