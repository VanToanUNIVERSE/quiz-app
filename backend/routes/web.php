<?php

use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/login', [AdminAuthController::class, 'showLogin']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware('admin')->group(function() {
    Route::get('/admin/dashboard', function() {
        return 'Admin dashboard - login thành công!';
    })->name('admin.dashboard');
    Route::resource('/admin/users', UserController::class)->only(['index','destroy','show'])->names('admin.users');
    Route::resource('/admin/collections', CollectionController::class)->only(['index','destroy','update'])->names('admin.collections');
});

