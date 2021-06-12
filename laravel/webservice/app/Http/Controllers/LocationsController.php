<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateLocationRequest;
use App\Http\Requests\StoreLocationRequest;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page') < 1 ? 1 : $request->query('page');
        $limit = ($request->query('limit') < 1) || ($request->query('limit') > 1000) ? 10 : $request->query('limit');
        $skip = ($page - 1) * $limit;

        $locations = Location::orderBy('id', 'ASC')
            ->skip($skip)
            ->take($limit)
            ->get();

        $locationsReadDto = LocationResource::collection($locations);

        return response()->json($locationsReadDto);
    }

    public function store(StoreLocationRequest $request)
    {
        $validated = $request->validated();

        $location = new Location();
        $location->city = $validated['city'];
        $location->country = $validated['country'];
        $location->latitude = $validated['latitude'];
        $location->longitude = $validated['longitude'];
        $location->save();

        $locationReadDto = new LocationResource($location);

        return response()->json($locationReadDto);
    }

    public function show(Location $location)
    {
        $locationReadDto = new LocationResource($location);

        return response()->json($locationReadDto);
    }

    public function update(UpdateLocationRequest $request, Location $location)
    {
        $validated = $request->validated();

        $location->city = $validated['city'];
        $location->country = $validated['country'];
        $location->latitude = $validated['latitude'];
        $location->longitude = $validated['longitude'];
        $location->save();

        $locationReadDto = new LocationResource($location);

        return response()->json($locationReadDto);
    }

    public function destroy(Location $location)
    {
        $location->delete();

        return response('', 204);
    }
}
