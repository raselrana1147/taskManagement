<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}/{path2?}/{path3?}', function () {
    return view('layouts.app');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');