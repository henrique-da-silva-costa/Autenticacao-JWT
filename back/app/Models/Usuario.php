<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use stdClass;

class Usuario
{
    public function usuarios()
    {
        try {
            $usuarios = DB::table('usuarios')->get();
            return $usuarios;
        } catch (\Throwable $th) {
            return [];
        }
    }

    public function cadastrar(array $dados)
    {
        $nome = isset($dados["nome"]) ?? $dados["nome"];
        $email = isset($dados["email"]) ?? $dados["email"];
        $senha = isset($dados["senha"]) ?? $dados["senha"];

        try {
            $retorno = new stdClass;
            $retorno->erro = FALSE;
            $retorno->msg = NULL;

            DB::table("usuarios")->insert([
                "nome" => $nome,
                "email" => $email,
                "senha" => $senha,
            ]);

            return $retorno;
        } catch (\Throwable $th) {
            $retorno = new stdClass;
            $retorno->erro = TRUE;
            $retorno->msg = $th->getMessage();

            return $retorno;
        }
    }
}
