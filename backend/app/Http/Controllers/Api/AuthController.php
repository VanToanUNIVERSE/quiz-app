<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|unique:users|string|max:255|min: 5',
            'password' => 'required|string|min:5',
            'fullName' => 'required|string|min:5',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads', 'public'); // lưu vào storage/app/public/uploads
        }

        $data = [
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'fullName' => $validated['fullName'],
            'image' => $imagePath
        ];

        $user = User::create($data);

        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user,
            'status' => true
        ]);
    }

    public function login(Request $request)
    {
        $info = $request->only('username', 'password');
        if (!Auth::attempt($info)) {
            return response()->json(['message' => 'The account is not exist', 'status' => false]);
        }
        $user = Auth::user();
        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'message' => 'Login success',
            'user' => $user,
            'status' => true
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
