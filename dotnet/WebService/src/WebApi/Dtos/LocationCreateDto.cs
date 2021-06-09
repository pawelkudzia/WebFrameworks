using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos
{
    public class LocationCreateDto
    {
        [Required]
        [StringLength(maximumLength: 100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string City { get; set; }

        [Required]
        [StringLength(maximumLength: 100, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Country { get; set; }

        [Required]
        [Range(-90.0, 90.0, ErrorMessage = "{0} value must be between {1} and {2}.")]
        public double Latitude { get; set; }

        [Required]
        [Range(-180.0, 180.0, ErrorMessage = "{0} value must be between {1} and {2}.")]
        public double Longitude { get; set; }
    }
}
