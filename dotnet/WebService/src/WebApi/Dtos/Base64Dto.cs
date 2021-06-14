using WebApi.Utils;

namespace WebApi.Dtos
{
    public class Base64Dto
    {
        private string _message;

        public string Message
        {
            get => _message;
            set
            {
                _message = value;
                EncodedMessage = Base64.Encode(Message);
                DecodedMessage = Base64.Decode(EncodedMessage);
            }
        }

        public string EncodedMessage { get; private set;}

        public string DecodedMessage { get; private set;}

        public Base64Dto() { }

        public Base64Dto(string message)
        {
            Message = message;
            EncodedMessage = Base64.Encode(Message);
            DecodedMessage = Base64.Decode(EncodedMessage);
        }
    }
}
