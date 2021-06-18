<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMeasurementRequest;
use App\Http\Requests\StoreMeasurementRequest;
use App\Http\Resources\MeasurementWithLocationResource;
use App\Http\Resources\MeasurementResource;
use App\Models\Measurement;
use App\Utils\Randomizer;
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

        if (array_key_exists('timestamp', $validated)) {
            $measurement->timestamp = $validated['timestamp'];
        } else {
            $measurement->timestamp = Carbon::now('UTC')->timestamp;
        }

        $measurement->locationId = $validated['locationId'];
        $measurement->save();

        $measurementReadDto = new MeasurementResource($measurement);

        return response()->json($measurementReadDto, 201);
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

        if (array_key_exists('timestamp', $validated)) {
            $measurement->timestamp = $validated['timestamp'];
        } else {
            $measurement->timestamp = Carbon::now('UTC')->timestamp;
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

    public function getRandomMeasurement()
    {
        $randomId = Randomizer::getNumber(1, 10001);
        $measurement = Measurement::findOrFail($randomId);

        $measurementReadDto = new MeasurementResource($measurement);

        return response()->json($measurementReadDto);
    }

    public function getRandomMeasurementWithLocation()
    {
        $randomId = Randomizer::getNumber(1, 10001);
        $measurementWithLocation = Measurement::with('location')->findOrFail($randomId);

        $measurementWithLocationReadDto = new MeasurementWithLocationResource($measurementWithLocation);

        return response()->json($measurementWithLocationReadDto);
    }

    public function getRandomMeasurementsByMultipleQueries(Request $request)
    {
        $count = ($request->query('count') < 1) || ($request->query('count') > 100) ? 1 : $request->query('count');

        $measurements = collect([]);

        while ($count > 0) {
            $randomId = Randomizer::getNumber(1, 10001);
            $measurement = Measurement::findOrFail($randomId);
            $measurements[] = $measurement;
            $count--;
        }

        $measurements = $measurements->sortBy('id');

        $measurementsReadDto = MeasurementResource::collection($measurements);

        return response()->json($measurementsReadDto);
    }

    public function createRandomMeasurement()
    {
        $timestamp = Carbon::now('UTC')->timestamp;
        $measurement = new Measurement();
        $measurement->parameter = 'pm10';
        $measurement->value = Randomizer::getNumber(0, 101);
        $measurement->timestamp = $timestamp;
        $measurement->locationId = Randomizer::getNumber(1, 11);
        $measurement->save();

        $measurementReadDto = new MeasurementResource($measurement);

        return response()->json($measurementReadDto, 201);
    }

    public function updateRandomMeasurement()
    {
        $randomId = Randomizer::getNumber(1, 10001);
        $measurement = Measurement::findOrFail($randomId);

        $timestamp = Carbon::now('UTC')->timestamp;
        $measurement->parameter = 'pm10';
        $measurement->value = Randomizer::getNumber(0, 101);
        $measurement->timestamp = $timestamp;
        $measurement->locationId = Randomizer::getNumber(1, 11);
        $measurement->save();

        $measurementReadDto = new MeasurementResource($measurement);

        return response()->json($measurementReadDto);
    }
}
