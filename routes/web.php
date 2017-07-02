<?php

# Web routing

Route::get('/', function () {
    return view('master');
});

Route::post('mail', 'MailController@postMail');

# Vue
Route::get('/{any?}', function () {
    return view('master');
})->where(['any' => '.*']);
