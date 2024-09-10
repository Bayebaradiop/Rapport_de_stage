<?php
namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Declaration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;



class DeclarationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupération de toutes les déclarations
        $declarations = Declaration::all();

        // Retourne les déclarations en JSON
        return response()->json($declarations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'nomProprietaire' => 'required|string|max:255',
            'prenomProprietaire' => 'required|string|max:255',
            'typePiece' => 'required|string|max:255',
            'email' => 'required|email|unique:declarations,email',
        ]);

        $user = Auth::user();

        $structureDeclarer = $user ? $user->structure : 'default_structure'; // Remplace 'default_structure' si nécessaire

        // Création de la déclaration
        $declaration = new Declaration();
        $declaration->nomProprietaire = $validated['nomProprietaire'];
        $declaration->prenomProprietaire = $validated['prenomProprietaire'];
        $declaration->typePiece = $validated['typePiece'];
        $declaration->email = $validated['email'];
        $declaration->structureDeclarer = $structureDeclarer;
        $declaration->date = now(); 
        $declaration->save();

        Mail::send('emails.test', ['nom' => $declaration->nomProprietaire, 'declaration' => $declaration], function ($message) use ($declaration) {
            $message->to($declaration->email)
                    ->subject('Confirmation de Déclaration');
        });
        return response()->json(['message' => 'Déclaration créée et e-mail envoyé avec succès.'], 201);
    
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
