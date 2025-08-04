<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {

        $validated = $request->validate([
            'username' => 'required|unique:users|string|max:255|min: 5',
            'password' => 'required|string|min:5',
            'fullName' => 'required|string|min:5'
        ]);

        $data = [
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'fullName' => $validated['fullName']
        ];

        $user = User::create($data);

        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user,
            'status' => 'success'
        ]);
    }
}
