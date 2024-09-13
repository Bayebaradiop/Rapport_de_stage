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
            'lieu' => 'required|string|max:255',
            'typePiece' => 'required|string|max:255',
            'email' => 'required|email|unique:declarations,email',
            'date_ramassage' => 'required|date',

            
        ]);

    
            
        $user = Auth::user();

        $structureDeclarer = $user ? $user->structure : 'default_structure'; // Remplace 'default_structure' si nécessaire

        // Création de la déclaration
        $declaration = new Declaration();
        $declaration->nomProprietaire = $validated['nomProprietaire'];
        $declaration->  lieu = $validated['lieu'];
        $declaration->prenomProprietaire = $validated['prenomProprietaire'];
        $declaration->typePiece = $validated['typePiece'];                
        $declaration->email = $validated['email'];
        $declaration->structureDeclarer = $structureDeclarer;
        $declaration->date_declarer = now(); 
        $declaration->date_ramassage = $validated['date_ramassage']; // Correction ici
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
        // Récupération d'une déclaration par ID
        $declaration = Declaration::find($id);

        if (!$declaration) {
            return response()->json(['message' => 'Déclaration non trouvée.'], 404);
        }

        // Retourne la déclaration en JSON
        return response()->json($declaration);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validation des données mises à jour
        $validated = $request->validate([
            'nomProprietaire' => 'sometimes|string|max:255',
            'prenomProprietaire' => 'sometimes|string|max:255',
            'lieu' => 'sometimes|string|max:255',
            'typePiece' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:declarations,email,' . $id,
            'date_ramassage' => 'sometimes|date',
        ]);

        // Récupération de la déclaration à mettre à jour
        $declaration = Declaration::find($id);

        if (!$declaration) {
            return response()->json(['message' => 'Déclaration non trouvée.'], 404);
        }

        // Mise à jour des champs
        $declaration->update($validated);

        return response()->json(['message' => 'Déclaration mise à jour avec succès.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Récupération de la déclaration à supprimer
        $declaration = Declaration::find($id);

        if (!$declaration) {
            return response()->json(['message' => 'Déclaration non trouvée.'], 404);
        }

        // Suppression de la déclaration
        $declaration->delete();

        return response()->json(['message' => 'Déclaration supprimée avec succès.']);
    }
}
