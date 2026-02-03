<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UsuarioController extends Controller
{
    private $usuarios;

    public function __construct()
    {
        $this->usuarios = new Usuario;
    }

    public function index(Request $request)
    {
        $usuarios = $this->usuarios->usuarios();

        return Response::json($usuarios);
    }

    public function cadastrar(Request $request)
    {
        $inputs = $request->all();

        print_r(Response::json($inputs));
    }
}
