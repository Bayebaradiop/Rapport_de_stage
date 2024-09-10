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


Route::middleware('auth:api')
    ->group(function (){
        Route::post('/tests', [\App\Http\Controllers\Api\DeclarationController::class, 'store']);
        Route::get('/tests', [\App\Http\Controllers\Api\DeclarationController::class, 'index']); // Lister tous les enregistrements
        Route::post('/logout',[\App\Http\Controllers\Api\AuthController::class,'logout'])->name('logout');        
    });

