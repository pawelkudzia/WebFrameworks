namespace WebApi.Dtos
{
    public class MeasurementReadDto
    {
        public int Id { get; set; }

        public string Parameter { get; set; }

        public double Value { get; set; }

        public string Date { get; set; }

        public int LocationId { get; set; }
    }
}
