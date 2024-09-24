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
Route::post('/SingIn', [\App\Http\Controllers\Api\AuthController::class, 'singin'])->name('singin');
Route::post('/AjoutAgent',[\App\Http\Controllers\Api\AuthController::class,'AjoutAgent'])->name('AjoutAgent');
Route::get('/getAgentByAgent/id={id}',[\App\Http\Controllers\Api\AuthController::class,'getAgentByAgent'])->name('getAgentByAgent');
Route::get('/getAllAgent',[\App\Http\Controllers\Api\AuthController::class,'getAllAgent'])->name('getAllAgent');
Route::put('/updateAgent/{id}',[\App\Http\Controllers\Api\AuthController::class,'updateAgent'])->name('updateAgent');
Route::put('/ArchiverAgent/{id}',[\App\Http\Controllers\Api\AuthController::class,'Archiver'])->name('Archiver');


      
Route::middleware('auth:api')
    ->group(function (){

        // la deconnexion
        Route::post('/logout',[\App\Http\Controllers\Api\AuthController::class,'logout'])->name('logout');

        // supprimer un declaration
        Route::delete('/declarations/{id}', [\App\Http\Controllers\Api\DeclarationController::class, 'destroy']);

        //Ajouter une declaration
        Route::post('/declarations', [\App\Http\Controllers\Api\DeclarationController::class, 'store']);

        /*
         * declaration de perte
         */
        Route::post('/declarationPerte',[\App\Http\Controllers\Api\DeclarationController::class, 'declarationPerte'])->name('declarationPerte');

        /** */
        Route::get('/getDeclaration/{id}',[\App\Http\Controllers\Api\DeclarationController::class, 'show']);

        //Afficher tous les declarations
        Route::get('/declarations', [\App\Http\Controllers\Api\DeclarationController::class, 'index']);

        //afficher les declaration par structure
        Route::get('/declarationsbystruc', [\App\Http\Controllers\Api\DeclarationController::class, 'indexbystruc']); 

        //mise en jour de l'etat de la declaration
        Route::put('/declarations/{id}/updateEtat', [\App\Http\Controllers\Api\DeclarationController::class, 'updateEtat']);
        /** Modifier */
        Route::put('/updateLostDoc/{id}',[\App\Http\Controllers\Api\DeclarationController::class, 'updateLostDoc']);
        
        Route::get('/indexbystrucPerteDoc',[\App\Http\Controllers\Api\DeclarationController::class, 'indexbystrucPerteDoc']);

        /** get declaration by email */
        Route::get('/getDeclarByEmail',[\App\Http\Controllers\Api\DeclarationController::class, 'getDeclarByEmail']);

        Route::get('/getpiecesimilaire',[\App\Http\Controllers\Api\DeclarationController::class, 'getpiecesimilaire']);

        Route::put('/updateDeclarationDocFound/{id}',[\App\Http\Controllers\Api\DeclarationController::class,'update']);
    });
 /**
         * tous les pieces declarer comme perdue pour l'interface agent
         */
        Route::get('getDeclarePerte',[\App\Http\Controllers\Api\DeclarationController::class, 'getDeclarePerte']);

