using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Utils;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        [HttpGet("json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<JsonTestDto> GetJson()
        {
            var jsonTestDto = new JsonTestDto
            {
                Message = $"API is working! Path: {HttpContext.Request.Path}",
                Date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            };

            return Ok(jsonTestDto);
        }

        [HttpGet("plaintext")]
        [Produces("text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<string> GetPlainText()
        {
            string message = $"API is working! Path: {HttpContext.Request.Path}";

            return Ok(message);
        }

        [HttpGet("base64")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Base64Dto> GetBase64([FromQuery]string message = "This is default message.")
        {
            int requiredMinLength = 3;
            int requiredMaxLenth = 25;

            if (message == null || message.Length < requiredMinLength || message.Length > requiredMaxLenth)
            {
                var errorMessageDto = new ErrorMessageDto
                {
                    Message = $"Query string parameter 'message' should be length of {requiredMinLength}-{requiredMaxLenth} characters."
                };

                return BadRequest(errorMessageDto);
            }

            var base64Dto = new Base64Dto
            {
                Message = message,
                EncodedMessage = Base64.Encode(message)
            };
            base64Dto.DecodedMessage = Base64.Decode(base64Dto.EncodedMessage);

            return Ok(base64Dto);
        }
    }
}
