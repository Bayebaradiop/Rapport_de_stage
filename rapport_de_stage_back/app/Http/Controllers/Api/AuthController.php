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
