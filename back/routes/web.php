<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::get('/csrf-token', function (Request $request) {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
});
Route::get('/', [UsuarioController::class, 'index'])->name('UsuarioController.index');
Route::post('/cadastro', [UsuarioController::class, 'cadastrar'])->name('UsuarioController.cadastrar');
