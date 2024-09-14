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




//la connexion
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');

Route::middleware('auth:api')
    ->group(function (){

        // la deconnexion
        Route::post('/logout',[\App\Http\Controllers\Api\AuthController::class,'logout'])->name('logout');

        // supprimer un declaration
        Route::delete('/declarations/{id}', [\App\Http\Controllers\Api\DeclarationController::class, 'destroy']);

        //Ajouter une declaration
        Route::post('/declarations', [\App\Http\Controllers\Api\DeclarationController::class, 'store']);

        //Afficher tous les declarations
        Route::get('/declarations', [\App\Http\Controllers\Api\DeclarationController::class, 'index']);

        //afficher les declaration par structure
        Route::get('/declarationsbystruc', [\App\Http\Controllers\Api\DeclarationController::class, 'indexbystruc']); 

        //mise en jour de l'etat de la declaration
        Route::put('/declarations/{id}/updateEtat', [\App\Http\Controllers\Api\DeclarationController::class, 'updateEtat']);
   

    });

