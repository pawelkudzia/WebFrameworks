<?php

namespace App\Dtos;

use App\Utils\Base64;

class Base64Dto
{
    public string $message;
    public string $encodedMessage;
    public string $decodedMessage;

    public function __construct($message)
    {
        $this->message = $message;
        $this->encodedMessage = Base64::encode($this->message);
        $this->decodedMessage = Base64::decode($this->encodedMessage);
    }
}
