<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [UsuarioController::class, 'index'])->name('UsuarioController.index');
Route::post('/cadastro', [UsuarioController::class, 'cadastrar'])->name('UsuarioController.cadastrar');
Route::post('/login', [UsuarioController::class, 'login'])->name('UsuarioController.login');
