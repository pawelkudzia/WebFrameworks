using System;

namespace WebApi.Utils
{
    public static class Randomizer
    {
        public static int GetNumber(int minValue, int maxValue)
        {
            var random = new Random();

            return random.Next(minValue, maxValue);
        }
    }
}
