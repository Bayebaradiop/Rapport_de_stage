<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/





Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register'])->name('register');

Route::middleware('auth:api')
    ->group(function (){
        Route::post('/logout',[\App\Http\Controllers\Api\AuthController::class,'logout'])->name('logout');
        Route::delete('/declarations/{id}', [\App\Http\Controllers\Api\DeclarationController::class, 'destroy']);
        Route::post('/declarations', [\App\Http\Controllers\Api\DeclarationController::class, 'store']);
        Route::get('/declarations', [\App\Http\Controllers\Api\DeclarationController::class, 'index']);    
    });
