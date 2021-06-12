<?php

use App\Http\Controllers\LocationsController;
use App\Http\Controllers\MeasurementsController;
use App\Http\Controllers\TestsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/json', [TestsController::class, 'getJson']);
Route::get('/plaintext', [TestsController::class, 'getPlainText']);
Route::get('/base64', [TestsController::class, 'getBase64']);

Route::apiResource('locations', LocationsController::class);
Route::apiResource('measurements', MeasurementsController::class);
