<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UsuarioController extends Controller
{
    private $usuario;

    public function __construct()
    {
        $this->usuario = new Usuario;
    }

    public function index(Request $request)
    {
        $usuarios = $this->usuario->usuarios();

        return Response::json($usuarios);
    }

    public function cadastrar(Request $request)
    {
        $inputs = $request->all();

        $email = isset($inputs["email"]) ? $inputs["email"] : NULL;

        $exsite = $this->usuario->existeUsuario($email);

        if ($exsite) {
            return Response::json(["erro" => TRUE, "msg" => "E-mail já cadastrado"]);
        }

        $cadastrar = $this->usuario->cadastrar($inputs);

        if ($cadastrar->erro) {
            return Response::json(["erro" => TRUE, "msg" => $cadastrar->msg]);
        }

        return Response::json(["erro" => FALSE, "msg" => "Cadastro realizado com sucesso!"]);
    }

    public function login(Request $request)
    {
        $inputs = $request->all();

        $existe = $this->usuario->login($inputs);

        if (!$existe) {
            return Response::json(["erro" => TRUE, "msg" => "Usuario não encontrado"]);
        }

        return Response::json($existe);
    }
}
