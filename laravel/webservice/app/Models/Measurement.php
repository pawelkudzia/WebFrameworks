<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $casts = [
        'parameter' => 'string',
        'value' => 'double',
        'timestamp' => 'integer',
        'locationId' => 'integer',
    ];

    public function location()
    {
        return $this->belongsTo(Location::class, 'locationId');
    }
}
