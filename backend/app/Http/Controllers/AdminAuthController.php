<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function showLogin() {
        return view('admin.login');
    }

    public function login(Request $request) {
        $request->validate([
            'username' => 'required|max:50',
            'password' => 'required|string',
        ]);

        if(!Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $message = 'Tài khoản hoặc mật khẩu sai';
            return back()->withErrors(['login' => $message]);
        }

        if(Auth::user()->role != 'admin') {
            Auth::logout();
            return back()->withErrors(['login' => 'Bạn không có quyền truy cập vào trang này']);
        }

        return redirect()->route('admin.dashboard');
    }
}
