using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    [Table("locations")]
    public class Location
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }

        [Column("city")]
        [Required]
        [StringLength(maximumLength: 35, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string City { get; set; }

        [Column("country")]
        [Required]
        [StringLength(maximumLength: 70, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Country { get; set; }

        [Column("latitude")]
        [Required]
        [Range(-90, 90)]
        public double Latitude { get; set; }

        [Column("longitude")]
        [Required]
        [Range(-180, 180)]
        public double Longitude { get; set; }

        public List<Measurement> Measurements { get; set; }
    }
}
