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
Route::post('/SingIn', [\App\Http\Controllers\Api\AuthController::class, 'singin'])->name('singin');
Route::post('/AjoutAgent',[\App\Http\Controllers\Api\AuthController::class,'AjoutAgent'])->name('AjoutAgent');
Route::get('/getAgentByAgent/id={id}',[\App\Http\Controllers\Api\AuthController::class,'getAgentByAgent'])->name('getAgentByAgent');
Route::get('/getAllAgent',[\App\Http\Controllers\Api\AuthController::class,'getAllAgent'])->name('getAllAgent');
Route::put('/updateAgent/{id}',[\App\Http\Controllers\Api\AuthController::class,'updateAgent'])->name('updateAgent');
Route::put('/ArchiverAgent/{id}',[\App\Http\Controllers\Api\AuthController::class,'Archiver'])->name('Archiver');



Route::middleware('auth:api')
    ->group(function (){
        Route::post('/logout',[\App\Http\Controllers\Api\AuthController::class,'logout'])->name('logout');        
    });

