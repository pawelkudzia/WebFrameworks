using WebApi.Utils;

namespace WebApi.Dtos
{
    public class Base64Dto
    {
        public string Message { get; set; }

        public string EncodedMessage { get; set; }

        public string DecodedMessage { get; set; }

        public Base64Dto()
        {
        }

        public Base64Dto(string message)
        {
            Message = message;
            EncodedMessage = Base64.Encode(Message);
            DecodedMessage = Base64.Decode(EncodedMessage);
        }
    }
}
