<?php

namespace App\Http\Controllers;

use App\Dtos\Base64Dto;
use App\Dtos\ErrorMessageDto;
use App\Dtos\JsonTestDto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TestsController extends Controller
{
    public function getJson(Request $request)
    {
        $jsonTestDto = new JsonTestDto();
        $jsonTestDto->message = 'API is working! Path: /' . $request->path();
        $jsonTestDto->date = Carbon::now('Europe/Warsaw')->isoFormat('YYYY-MM-DDTHH:mm:ss.SSS');

        return response()->json($jsonTestDto);
    }

    public function getPlainText(Request $request)
    {
        $message = 'API is working! Path: /' . $request->path();

        return response($message, 200, ['Content-Type' => 'text/plain']);
    }

    public function getBase64(Request $request)
    {
        $message = $request->has('message') ? $request->query('message') : 'This is default message.';

        $requiredMinLength = 3;
        $requiredMaxLenth = 25;

        if ($message === null || Str::length($message) < $requiredMinLength || Str::length($message) > $requiredMaxLenth) {
            $errorMessageDto = new ErrorMessageDto("'message' length must be between {$requiredMinLength} and {$requiredMaxLenth}.");

            return response()->json($errorMessageDto, 400);
        }

        $base64Dto = new Base64Dto($message);

        return response()->json($base64Dto);
    }
}
