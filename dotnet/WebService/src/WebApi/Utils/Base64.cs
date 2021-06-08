using System;
using System.Text;

namespace WebApi.Utils
{
    public static class Base64
    {
        public static string Encode(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);

            return Convert.ToBase64String(messageBytes);
        }

        public static string Decode(string base64EncodedMessage)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedMessage);

            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
