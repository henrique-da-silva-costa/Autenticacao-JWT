<?php

namespace App\Providers;

use Illuminate\Auth\GenericUser;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use Illuminate\Auth\DatabaseUserProvider;
use App\Models\Usuario;

class CustomUserProvider extends DatabaseUserProvider
{
    /**
     * Criar uma instância do GenericUser com os dados do banco
     * Sobrescrevendo para retornar nosso model Usuario
     */
    protected function getGenericUser($user)
    {
        if (!is_null($user)) {
            // Criar instância do nosso model Usuario
            $usuarioModel = new Usuario();

            // Preencher os atributos do model
            $usuarioModel->id = $user->id;
            $usuarioModel->nome = $user->nome;
            $usuarioModel->email = $user->email;
            $usuarioModel->password = $user->password;
            $usuarioModel->remember_token = $user->remember_token ?? null;

            // Adicionar outros campos se existirem
            foreach (get_object_vars($user) as $key => $value) {
                if (!isset($usuarioModel->$key)) {
                    $usuarioModel->$key = $value;
                }
            }

            return $usuarioModel;
        }
    }

    /**
     * Validar credenciais
     */
    public function validateCredentials(UserContract $user, array $credentials)
    {
        $plain = $credentials['password'];

        // O model Usuario já implementa JWTSubject e Authenticatable
        // A senha já deve estar hasheada no banco
        return $this->hasher->check($plain, $user->getAuthPassword());
    }
}