<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMeasurementRequest;
use App\Http\Requests\StoreMeasurementRequest;
use App\Http\Resources\MeasurementResource;
use App\Models\Measurement;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MeasurementsController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page') < 1 ? 1 : $request->query('page');
        $limit = ($request->query('limit') < 1) || ($request->query('limit') > 1000) ? 10 : $request->query('limit');
        $skip = ($page - 1) * $limit;

        $measurements = Measurement::orderBy('id', 'ASC')
            ->skip($skip)
            ->take($limit)
            ->get();

        $measurementsReadDto = MeasurementResource::collection($measurements);

        return response()->json($measurementsReadDto);
    }

    public function store(StoreMeasurementRequest $request)
    {
        $validated = $request->validated();

        $measurement = new Measurement();
        $measurement->parameter = $validated['parameter'];
        $measurement->value = $validated['value'];

        if (array_key_exists('date', $validated)) {
            $measurement->date = $validated['date'];
        } else {
            $measurement->date = Carbon::now();
        }

        $measurement->locationId = $validated['locationId'];
        $measurement->save();

        $measurementReadDto = new MeasurementResource($measurement);

        return response()->json($measurementReadDto);
    }

    public function show(Measurement $measurement)
    {
        $measurementReadDto = new MeasurementResource($measurement);

        return response()->json($measurementReadDto);
    }

    public function update(UpdateMeasurementRequest $request, Measurement $measurement)
    {
        $validated = $request->validated();

        $measurement->parameter = $validated['parameter'];
        $measurement->value = $validated['value'];

        if (array_key_exists('date', $validated)) {
            $measurement->date = $validated['date'];
        } else {
            $measurement->date = Carbon::now();
        }

        $measurement->locationId = $validated['locationId'];
        $measurement->save();

        $measurementReadDto = new MeasurementResource($measurement);

        return response()->json($measurementReadDto);
    }

    public function destroy(Measurement $measurement)
    {
        $measurement->delete();

        return response('', 204);
    }
}
