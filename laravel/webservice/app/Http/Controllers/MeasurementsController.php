<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use Illuminate\Http\Request;

class MeasurementsController extends Controller
{
    public function index()
    {
        return response()->json(['test' => 'working']);
    }

    public function store(Request $request)
    {
        return response()->json(['test' => 'working']);
    }

    public function show(Measurement $measurement)
    {
        return response()->json(['test' => 'working']);
    }

    public function update(Request $request, Measurement $measurement)
    {
        return response()->json(['test' => 'working']);
    }

    public function destroy(Measurement $measurement)
    {
        return response()->json(['test' => 'working']);
    }
}
