using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    [Table("measurements")]
    public class Measurement
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }

        [Column("parameter")]
        [Required]
        [StringLength(10, ErrorMessage = "{0} length must be between {2} and {1} characters.", MinimumLength = 1)]
        public string Parameter { get; set; }

        [Column("value")]
        [Required]
        [Range(0.0, 100.0, ErrorMessage = "{0} must be between {1} and {2}.")]
        public double Value { get; set; }

        [Column("timestamp")]
        [Required]
        public long Timestamp { get; set; } = (long)DateTime.UtcNow.Subtract(DateTime.UnixEpoch).TotalSeconds;

        [Column("locationId")]
        public int LocationId { get; set; }

        public Location Location { get; set; }
    }
}
