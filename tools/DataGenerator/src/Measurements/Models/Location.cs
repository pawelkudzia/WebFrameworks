using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Measurements.Models
{
    [Table("locations")]
    public class Location
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }

        [Column("city")]
        [Required]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1} characters.", MinimumLength = 1)]
        public string City { get; set; }

        [Column("country")]
        [Required]
        [StringLength(100, ErrorMessage = "{0} length must be between {2} and {1} characters.", MinimumLength = 1)]
        public string Country { get; set; }

        [Column("latitude")]
        [Required]
        [Range(-90.0, 90.0, ErrorMessage = "{0} must be between {1} and {2}.")]
        public double Latitude { get; set; }

        [Column("longitude")]
        [Required]
        [Range(-180.0, 180.0, ErrorMessage = "{0} must be between {1} and {2}.")]
        public double Longitude { get; set; }

        public List<Measurement> Measurements { get; set; }
    }
}
