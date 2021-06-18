using System;
using System.Collections.Generic;
using Bogus;
using Measurements.Models;

namespace Measurements.Data
{
    public class MeasurementFaker
    {
        public int Count { get; set; } = 10000;

        public int MinLocationId { get; set; } = 1;

        public int MaxLocationId { get; set; } = 10;

        public double MinValue { get; set; } = 0.0;

        public double MaxValue { get; set; } = 100.0;

        public string Locale { get; set; } = "en";

        public string Parameter { get; set; } = "pm25";

        public DateTime StartDate { get; set; } = new DateTime(2015, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public DateTime EndDate { get; set; } = new DateTime(DateTime.Now.Year, 7, 1, 0, 0, 0, DateTimeKind.Utc);

        public IEnumerable<Measurement> Measurements { get; set; }

        public IEnumerable<Measurement> Generate()
        {
            var measurementId = 1;
            var digits = 4;

            var Measurements = new Faker<Measurement>(Locale)
                .RuleFor(m => m.Id, f => measurementId++)
                .RuleFor(m => m.Parameter, f => Parameter)
                .RuleFor(m => m.Value, f => Math.Round(f.Random.Double(MinValue, MaxValue), digits))
                .RuleFor(m => m.Timestamp, f => DateBetween(StartDate, EndDate))
                .RuleFor(m => m.LocationId, f => f.Random.Number(MinLocationId, MaxLocationId))
                .Generate(Count);

            return Measurements;
        }

        private static long DateBetween(DateTime start, DateTime end)
        {
            var minTicks = Math.Min(start.Ticks, end.Ticks);
            var maxTicks = Math.Max(start.Ticks, end.Ticks);

            var totalTimeSpanTicks = maxTicks - minTicks;
            var partTimeSpan = RandomTimeSpanFromTicks(totalTimeSpanTicks);
            var date = new DateTime(minTicks, start.Kind) + partTimeSpan;
            var timestamp = (long)date.Subtract(DateTime.UnixEpoch).TotalSeconds;

            return timestamp;
        }

        private static TimeSpan RandomTimeSpanFromTicks(long totalTimeSpanTicks)
        {
            var random = new Random();
            var partTimeSpanTicks = random.NextDouble() * totalTimeSpanTicks;

            return TimeSpan.FromTicks(Convert.ToInt64(partTimeSpanTicks));
        }
    }
}
