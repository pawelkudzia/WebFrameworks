using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class MeasurementCreateDto
    {
        [Required]
        [StringLength(maximumLength: 10, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Parameter { get; set; }

        [Required]
        [Range(0.0, 100.0, ErrorMessage = "{0} must be between {1} and {2}.")]
        public double Value { get; set; }

        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "{0} must be allowed value.")]
        public int LocationId { get; set; }
    }
}
