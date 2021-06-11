using System.Collections.Generic;
using Bogus;
using Measurements.Models;

namespace Measurements.Data
{
    public class LocationFaker
    {
        public int Count { get; set; } = 10;

        public string Locale { get; set; } = "en";

        public IEnumerable<Location> Locations { get; set; }

        public IEnumerable<Location> Generate()
        {
            var locationId = 1;

            var Locations = new Faker<Location>(Locale)
                .RuleFor(l => l.Id, f => locationId++)
                .RuleFor(l => l.City, f => f.Address.City())
                .RuleFor(l => l.Country, f => f.Address.Country())
                .RuleFor(l => l.Latitude, f => f.Address.Latitude())
                .RuleFor(l => l.Longitude, f => f.Address.Longitude())
                .Generate(Count);

            return Locations;
        }
    }
}
