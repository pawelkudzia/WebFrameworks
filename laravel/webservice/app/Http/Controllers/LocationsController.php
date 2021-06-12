<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page') < 1 ? 1 : $request->query('page');
        $limit = ($request->query('limit') < 1) || ($request->query('limit') > 1000) ? 10 : $request->query('limit');
        $skip = ($page - 1) * $limit;

        $locations = Location::orderBy('id', 'ASC')->skip($skip)->take($limit)->get();

        return response()->json($locations);
    }

    public function store(Request $request)
    {
        return response()->json(['test' => 'working']);
    }

    public function show(Location $location)
    {
        return response()->json(['test' => 'working']);
    }

    public function update(Request $request, Location $location)
    {
        return response()->json(['test' => 'working']);
    }

    public function destroy(Location $location)
    {
        return response()->json(['test' => 'working']);
    }
}
