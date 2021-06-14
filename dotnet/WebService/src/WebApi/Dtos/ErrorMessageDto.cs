namespace WebApi.Dtos
{
    public class ErrorMessageDto
    {
        public string Message { get; set; } = "Something went wrong.";

        public ErrorMessageDto() { }

        public ErrorMessageDto(string message) => Message = message;
    }
}
