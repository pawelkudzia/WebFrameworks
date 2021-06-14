using Measurements.Models;
using Microsoft.EntityFrameworkCore;

namespace Measurements.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Location> Locations { get; set; }

        public DbSet<Measurement> Measurements { get; set; }

        private readonly string _dataSource = "Data Source=measurements.sqlite3";

        protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite(_dataSource);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .HasCheckConstraint("CK_locations_latitude", "(latitude >= -90) AND (latitude <= 90)")
                .HasCheckConstraint("CK_locations_longitude", "(longitude >= -180) AND (longitude <= 180)");

            var locationFaker = new LocationFaker();
            modelBuilder.Entity<Location>()
                .HasData(locationFaker.Generate());

            var measurementFaker = new MeasurementFaker();
            modelBuilder.Entity<Measurement>()
                .HasData(measurementFaker.Generate());
        }
    }
}
