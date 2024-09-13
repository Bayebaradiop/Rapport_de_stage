<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
class Authcontroller extends Controller
{
   
    
    


    
    public function login(Request $request)
    {
        $data =  $request->validate([
            "email" => "required|email|",
            "password" => "required"
        ]);

        $token = JWTAuth::attempt($data);

        if(!empty($token))
        {
            return response()->json([
                'statut' => 200,
                "token" =>  $token
            ]);

        }else{
            return response()->json([
                "statut" => false,
                "token" =>  null
            ]);
        }
    }



    // public function register(Request $request)
    // {
    //     $data = $request->validate([
    //         'nom' => 'required|string|max:255',
    //         'prenom' => 'required|string|max:255',
    //         'numTel' => 'required|string|max:255',
    //         'adresse' => 'required|string|max:255',
    //         'email' => 'required|email|unique:users,email',
    //         'password' => 'required|string|confirmed', // Mot de passe confirmé
    //     ]);

    //     $user = User::create([
    //         'nom' => $data['nom'],
    //         'prenom' => $data['prenom'],
    //         'numTel' => $data['numTel'],
    //         'adresse' => $data['adresse'],
    //         'email' => $data['email'],
    //         'password' => Hash::make($data['password']), // Hachage du mot de passe
    //     ]);

    //     $token = JWTAuth::fromUser($user);

    //     return response()->json([
    //         'statut' => 200,
    //         'message' => 'Utilisateur créé avec succès',
    //         'token' => $token,
    //         'user' => $user
    //     ]);
    // }






    public function logout()
    {
        auth()->logout();
        return response()->json([
            'statut' => true,
            "message" =>  "user logout !"
        ]);
    }
    public  function refresh()
    {
        $newToken = auth()->refresh();
        return response()->json([
            'statut' => true,
            "token" =>  $newToken
        ]);
    }
}
