<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use stdClass;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    protected $table = 'usuarios';

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'nome',
        'email',
        'password', // Mudado de 'senha' para 'password'
    ];

    // Esconder o campo da senha nas respostas
    protected $hidden = [
        'password', // Mudado de 'senha' para 'password'
        'remember_token',
    ];

    public function usuarios()
    {
        try {
            $usuarios = DB::table($this->table)->get();
            return $usuarios;
        } catch (\Throwable $th) {
            return [];
        }
    }

    public function login(array $dados)
    {
        $email = isset($dados["email"]) ? $dados["email"] : NULL;
        $password = isset($dados["password"]) ? $dados["password"] : NULL; // Mudado de 'senha' para 'password

        $usuario = $this->existeUsuario($email);

        if (!$usuario) {
            return FALSE;
        }

        if (!Hash::check($password, $usuario->$password)) {
            return FALSE;
        }

        try {
            $existe = DB::table($this->table)
                ->where("email", "=", $email)
                ->first(["email", "nome"]);
            if (!$existe) {
                return FALSE;
            }

            return $existe;
        } catch (\Throwable $th) {
            return FALSE;
        }
    }

    public function existeUsuario(string $email)
    {
        try {
            $existe = DB::table($this->table)->where("email", "=", $email)->first();
            if (!$existe) {
                return FALSE;
            }

            return $existe;
        } catch (\Throwable $th) {
            return FALSE;
        }
    }

    public function cadastrar(array $dados)
    {
        $nome = isset($dados["nome"]) ? $dados["nome"] : NULL;
        $email = isset($dados["email"]) ? $dados["email"] : NULL;
        $password = isset($dados["password"]) ? Hash::make($dados["password"]) : NULL; // Mudado de 'senha' para 'password'

        try {
            $retorno = new stdClass;
            $retorno->erro = FALSE;
            $retorno->msg = NULL;

            DB::table($this->table)->insert([
                "nome" => $nome,
                "email" => $email,
                "password" => $password, // Mudado de 'senha' para 'password'
            ]);

            return $retorno;
        } catch (\Throwable $th) {
            $retorno = new stdClass;
            $retorno->erro = TRUE;
            $retorno->msg = $th->getMessage();

            return $retorno;
        }
    }

    // Métodos do JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
