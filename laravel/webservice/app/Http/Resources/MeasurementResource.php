<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MeasurementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'parameter' => $this->parameter,
            'value' => $this->value,
            'date' => Carbon::createFromTimestampUTC($this->timestamp)->format('Y-m-d\TH:i:s\Z'),
            'locationId' => $this->locationId
        ];
    }
}
