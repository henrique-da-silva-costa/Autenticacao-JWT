<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use stdClass;

class Usuario
{
    private string $tabela;

    public function __construct()
    {
        $this->tabela = Tabela::USUARIOS;
    }

    public function usuarios()
    {
        try {
            $usuarios = DB::table($this->tabela)->get();
            return $usuarios;
        } catch (\Throwable $th) {
            return [];
        }
    }

    public function login(array $dados)
    {
        $email = isset($dados["email"]) ? $dados["email"] : NULL;
        $senha = isset($dados["senha"]) ? $dados["senha"] : NULL;

        try {
            $existe = DB::table($this->tabela)
                ->where("email", "=", $email)
                ->where("senha", "=", $senha)
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
            $existe = DB::table($this->tabela)->where("email", "=", $email)->first();
            if (!$existe) {
                return FALSE;
            }

            return TRUE;
        } catch (\Throwable $th) {
            return FALSE;
        }
    }

    public function cadastrar(array $dados)
    {
        $nome = isset($dados["nome"]) ? $dados["nome"] : NULL;
        $email = isset($dados["email"]) ? $dados["email"] : NULL;
        $senha = isset($dados["senha"]) ? $dados["senha"] : NULL;

        try {
            $retorno = new stdClass;
            $retorno->erro = FALSE;
            $retorno->msg = NULL;

            DB::table($this->tabela)->insert([
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
