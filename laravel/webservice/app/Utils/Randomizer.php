<?php

namespace App\Utils;

class Randomizer
{
    public static function getNumber(int $minValue, int $maxValue): int
    {
        return rand($minValue, $maxValue - 1);
    }
}
