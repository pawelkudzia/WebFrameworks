namespace WebApi.Dtos
{
    public class LocationReadDto
    {
        public int Id { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
