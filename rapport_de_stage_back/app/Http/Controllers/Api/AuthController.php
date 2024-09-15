<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Nette\Schema\Elements\Structure;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
class AuthController extends Controller
{
   
    
  
   /**
    * Methode pour la connexion
    */
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
                'data'=> auth()->user(),
                "token" =>  $token
            ]);

        }else{
            return response()->json([
                "statut" => false,
                "token" =>  null
            ]);
        }
    }

    /**
     * Methode pour la deconnection
     */
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'statut' => true,
            "message" =>  "user logout !"
        ]);
    }

    /**
     * Methode pour l'inscription
     */
    public function singin(Request $request){
        $request->validate([
            'Prenom' => 'required',
            'Nom' => 'required',
            'Email' => 'required|email',
            'password' => 'required',
            'NumTel' => 'required',
            'Adresse'=>'required',
        ]);
       $user = User::create([
            'prenom' => $request->Prenom,
            'nom' => $request->Nom,
            'email' => $request->Email,
            'password' => Hash::make($request->password),
            'numTel' => $request->NumTel,
            'adresse'=>$request->Adresse,
        ]);
        return response()->json([
            'statut' => 200,
            'data' => $user,
            "token" => null
        ]);
    }

    /**
     * Methode d'ajout de l'agent
     */
    public function AjoutAgent(Request $request){
        $request->validate([
            'Prenom' => 'required',
            'Nom' => 'required',
            'Email' => 'required|email',
            'password' => 'required',
            'NumTel' => 'required',
            'Adresse'=>'required',
            'TypeStructure' => 'required',
            'structure' => 'required'
            // 'profil'
        ]);

        $initials = strtoupper(substr($request->Prenom, 0, 1) . substr($request->Nom, 0, 1));
        $year = date('Y');
        $randomNumber = Str::random(4);
        $matricule = $initials . $year . $randomNumber;


        $user = User::create([
            'prenom' => $request->Prenom,
            'nom' => $request->Nom,
            'email' => $request->Email,
            'password' => Hash::make($request->password),
            'numTel' => $request->NumTel,
            'adresse'=>$request->Adresse,
            'typeStructure' => $request->TypeStructure,
            'structure' => $request->structure,
            'profil' => 2,
            'matricule' =>$matricule
        ]);

        return response()->json([
            'statut' => 200,
            'data' => $user,
            "token" => null
        ]);

    }

    /**
     * Recuperer un agent de par son id
     */
    public function getAgentByAgent(string $id){
        try{
            $Agent=User::findOrFail($id);
            // Rendre le champ "password" visible pour cette réponse
            //  $Agent->makeVisible('password');
            return response()->json($Agent,200);
        }catch(ModelNotFoundException $e){
            return response()->json(['erreur' => 'Element introuvable'], 404);
        }
    }

    /**
     * Methode permettant de recuperer tous les agents
     */
    public function getAllAgent(){
        $AllAgent = User::where('profil',2)->where('activate', 1)->get();
        return response()->json($AllAgent);
    }

    /**
     * Methode pour mettre a jour un agent
     */
    public function updateAgent(Request $request, string $id)
    {
        try {
            $agent = User::findOrFail($id);
            $validate = $request->validate([
                'prenom' => 'required',
                'nom' => 'required',
                'email' => 'required|email',
                // 'password' => 'required',
                'numTel' => 'required',
                'adresse'=>'required',
                'typeStructure' => 'required',
                'structure' => 'required',
                // 'matricule'=>'required',
            ]);
            $agent->update($validate);
            return response()->json($agent,200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['erreur' => 'Modification impossible une erreur est survenue'], 404);
        }
     
    }

    /**
     * Cette methode permet d'archiver un agent il prend en parametre l'id de l'agent et change l'etat
     * a 0 pour l'archiver
     */
    public function Archiver(string $id)
    {
        try{
            $Archi_user=User::findOrFail($id);
            $Archi_user->activate = 0;
            $Archi_user->Update();
            return response()->json($Archi_user,200);
        }catch(ModelNotFoundException $e){
            return response()->json(['erreur' => 'Element introuvable'], 404);
        }
       
    }
    
    // public  function refresh()
    // {
    //     $newToken = auth()->refresh();
    //     return response()->json([
    //         'statut' => true,
    //         "token" =>  $newToken
    //     ]);
    // }
}
