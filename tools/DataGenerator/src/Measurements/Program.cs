using System;
using System.Linq;
using Measurements.Data;
using Microsoft.EntityFrameworkCore;

namespace Measurements
{
    public class Program
    {
        private static readonly ApplicationDbContext _context = new();
        private static int _exitCode = 0;

        public static void Main() => Run();

        private static void Run()
        {
            try
            {
                InitApplication();
            }
            catch (Exception e)
            {
                HandleException(e);
            }
            finally
            {
                CloseApplication();
            }
        }

        private static void InitApplication()
        {
            if (_context.Database.CanConnect())
            {
                Console.WriteLine("Database connection was opened.");

                int locationsCount = _context.Locations.Count();
                int measurementsCount = _context.Measurements.Count();

                Console.WriteLine($"Locations: {locationsCount}.");
                Console.WriteLine($"Measurements: {measurementsCount}.");
            }
            else
            {
                Console.WriteLine("It was not possible to connect to database.");
            }
        }

        private static void HandleException(Exception e)
        {
            Console.Error.WriteLine("Something went wrong.");
            Console.Error.WriteLine($"Message:\n{e.Message}");
            _exitCode = -1;
        }

        private static void CloseApplication()
        {
            if (_context.Database.CanConnect())
            {
                _context.Database.CloseConnection();
                Console.WriteLine("Database connection was closed.");
            }

            Environment.Exit(_exitCode);
        }
    }
}
