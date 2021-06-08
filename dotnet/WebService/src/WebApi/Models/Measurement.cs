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
        [StringLength(maximumLength: 3, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 3)]
        public string Parameter { get; set; }

        [Column("value")]
        [Required]
        [Range(0.0, 100.0)]
        public double Value { get; set; }

        [Column("date")]
        [Required]
        public DateTime Date { get; set; }

        [Column("locationId")]
        public int LocationId { get; set; }

        public Location Location { get; set; }
    }
}
