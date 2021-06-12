<?php

namespace App\Utils;

class Base64
{
    public static function encode(string $message): string
    {
        return base64_encode($message);
    }

    public static function decode(string $base64EncodedMessage): string
    {
        return base64_decode($base64EncodedMessage);
    }
}
