<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Auth::provider('custom-database', function ($app, array $config) {
            return new \App\Providers\CustomUserProvider(
                $app['db'],
                $config['table'],
                'id', // identifier
                'password', // password field
                $app['hash']
            );
        });
    }
}
