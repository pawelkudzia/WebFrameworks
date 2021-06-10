using System;

namespace WebApi.Dtos
{
    public class MeasurementWithLocationReadDto
    {
        public int Id { get; set; }

        public string Parameter { get; set; }

        public double Value { get; set; }

        public DateTime Date { get; set; }

        public LocationReadDto Location { get; set; }
    }
}
