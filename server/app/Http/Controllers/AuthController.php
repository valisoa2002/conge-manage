<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $random_contact = random_int(100000, 900000);
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'is_admin' => 0,
            'contact' => $random_contact,
            'photo' => "",
            'solde' => 5,
            'poste' => "Personnel"
        ]);


        $token = $user->createToken('main')->plainTextToken;

        return response(["user" => $user, "token" => $token], 201);
    }


    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => "Email ou Mot de passe invalide!!"
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(["user" => $user, "token" => $token], 201);
    }



    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
