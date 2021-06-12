<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLocationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'city' => 'required|min:1|max:100',
            'country' => 'required|min:1|max:100',
            'latitude' => 'required|numeric|min:-90.0|max:90.0',
            'longitude' => 'required|numeric|min:-180.0|max:180.0',
        ];
    }
}
