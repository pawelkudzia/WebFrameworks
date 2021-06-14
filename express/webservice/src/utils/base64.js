class Base64 {
    static encode(message) {
        return Buffer.from(message).toString('base64');
    }

    static decode(base64EncodedMessage) {
        return Buffer.from(base64EncodedMessage, 'base64').toString();
    }
}

export default Base64;
