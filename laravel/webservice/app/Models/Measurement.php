<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $casts = [
        'value' => 'double',
        'locationId' => 'integer'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
