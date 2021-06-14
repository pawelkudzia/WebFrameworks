<?php

namespace App\Dtos;

class ErrorMessageDto
{
    public string $message;

    public function __construct(string $message = 'Something went wrong.')
    {
        $this->message = $message;
    }
}
