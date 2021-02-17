<?php

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('projects','API\ProjectController');
Route::get('projects/search/{search}','API\ProjectController@search');
Route::apiResource('tasks','API\TaskController');
Route::post('login','API\Auth\LoginController@login');
Route::post('register','API\Auth\LoginController@register');