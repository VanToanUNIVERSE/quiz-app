<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function showCollections(Request $request) {
        $userId = $request->userId;
        $collections = User::find($userId)->collections;
        return response()->json([
            'collections' => $collections,
            'status' => true
        ]);
    }
}
