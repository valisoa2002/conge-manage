<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CongeController;
use App\Http\Controllers\HistoriqueController;
use App\Http\Controllers\DeviseController;
use App\Http\Controllers\TauxChangeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Pour la partie authentification
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});


// ==============
// Pour les users
// ==============
Route::get('/users', [UserController::class, 'allUser']);
Route::put('/users/to/admin/{id}', [UserController::class, 'setUserToAdmin']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'edit']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::get('/users/infos/soldes_and_count/{id}', [UserController::class, 'getUserSoldesWithNombreDemandesEffectues']);
Route::get('/users/stats/admin', [UserController::class, 'getStatisticDemandes']);


// ==============
// Pour les types
// ==============
Route::get('/types', [CongeController::class, 'getAllTypes']);


// ===============
// Pour les congés
// ===============
Route::post('/conges/add', [CongeController::class, 'addConge']);
Route::get('/demandes/{id}', [CongeController::class, 'getAllDemandesByUser']);
Route::get('/demandes', [CongeController::class, 'getAllDemandes']);
Route::get('/demandes/status/attentes', [CongeController::class, 'getAllDemandesEnAttentes']);
Route::get('/demandes/infos/to/calendar', [CongeController::class, 'getUserInfoCongeToPutInCalendar']);


// ==================================
// Pour valider ou refuser les congés
// ==================================
Route::put('/demandes/valid/{id}', [CongeController::class, 'validateConge']);
Route::put('/demandes/refus/{id}', [CongeController::class, 'refuseConge']);
