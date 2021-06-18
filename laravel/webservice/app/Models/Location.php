<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $casts = [
        'city' => 'string',
        'country' => 'string',
        'latitude' => 'double',
        'longitude' => 'double'
    ];

    public function measurements()
    {
        return $this->hasMany(Measurement::class, 'locationId');
    }
}
