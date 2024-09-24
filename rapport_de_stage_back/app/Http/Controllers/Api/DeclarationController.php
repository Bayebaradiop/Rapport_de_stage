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
   
    // afficher les declartion dont l'etat est 1
    public function index()
    {
        
        $declarations = Declaration::where('etat',1)->get();

        return response()->json($declarations);
    }

    //afficher les declaration par structure
    public function indexbystruc()
    {
        // Récupération de l'utilisateur connecté
        $user = Auth::user();
        
        // Récupération des déclarations appartenant à la même structure que l'utilisateur
        $declarations = Declaration::where('structureDeclarer', $user->structure) ->where('etat', 1)->get();
    
        return response()->json($declarations);
    }
    

   //ajouter declaration
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomProprietaire' => 'required|string|max:255',
            'prenomProprietaire' => 'required|string|max:255',
            'lieu' => 'required|string|max:255',
            'typePiece' => 'required|string|max:255',
            'email' => 'required|email|unique:declarations,email',
            'date_ramassage' => 'required|date',


        ]);

    
            
        $user = Auth::user();

        $structureDeclarer = $user ? $user->structure : 'default_structure'; 

        $declaration = new Declaration();
        $declaration->nomProprietaire = $validated['nomProprietaire'];
        $declaration->  lieu = $validated['lieu'];
        $declaration->prenomProprietaire = $validated['prenomProprietaire'];
        $declaration->typePiece = $validated['typePiece'];                
        $declaration->email = $validated['email'];
        $declaration->structureDeclarer = $structureDeclarer;
        $declaration->date_declarer = now(); 
        $declaration->date_ramassage = $validated['date_ramassage']; 
        $declaration->save();

        //cette boue de code c pour envoiyer mail apres declaration
        Mail::send('emails.test', ['nom' => $declaration->nomProprietaire, 'declaration' => $declaration], function ($message) use ($declaration) {
            $message->to($declaration->email)
                    ->subject('Confirmation de Déclaration');
        });
        return response()->json(['message' => 'Déclaration créée et e-mail envoyé avec succès.'], 201);
    
    }


    
    public function show(string $id)
    {
        $declaration = Declaration::find($id);

        if (!$declaration) {
            return response()->json(['message' => 'Déclaration non trouvée.'], 404);
        }

        return response()->json($declaration);
    }

    
    //modifier declaration
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'nomProprietaire' => 'required|string|max:255',
            'prenomProprietaire' => 'required|string|max:255',
            'lieu' => 'required|string|max:255',
            'typePiece' => 'required|string|max:255',
            'email' => 'required|email',
            'date_ramassage' => 'required|date',
        ]);

        $declaration = Declaration::find($id);

        if (!$declaration) {
            return response()->json(['message' => 'Déclaration non trouvée.'], 404);
        }

        $declaration->update($validated);

        return response()->json(['message' => 'Déclaration mise à jour avec succès.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    //supprimer declaration
    public function destroy(string $id)
    {
        $declaration = Declaration::find($id);

        if (!$declaration) {
            return response()->json(['message' => 'Déclaration non trouvée.'], 404);
        }

        $declaration->delete();

        return response()->json(['message' => 'Déclaration supprimée avec succès.']);
    }

    // pour changer l'etat de la declaration

    public function updateEtat($id) {
        $declaration = Declaration::find($id);
        if ($declaration) {
            $declaration->etat =0; // Modifiez selon vos besoins
            $declaration->save();
            
            Mail::send('emails.pieceRemi', ['nom' => $declaration->nomProprietaire, 'declaration' => $declaration], function ($message) use ($declaration) {
            $message->to($declaration->email)
                ->subject('Confirmation de Déclaration');
        });
            return response()->json(['message' => 'État mis à jour avec succès.'], 200);
        } else {
            return response()->json(['error' => 'Déclaration introuvable.'], 404);
        }
    }

    public function declarationPerte(Request $request){

        $validated = $request->validate([
            'nomProprietaire' => 'required|string|max:255',
            'prenomProprietaire' => 'required|string|max:255',
            'lieu' => 'required|string|max:255',
            'typePiece' => 'required|string|max:255',
            'email' => 'required|email',
            'date_perte' => 'required|date',
        ]);

    
            
        $user = Auth::user();

        $structureDeclarer = $user ? $user->structure : 'default_structure'; 

        $declaration = new Declaration();
        $declaration->nomProprietaire = $validated['nomProprietaire'];
        $declaration-> lieu = $validated['lieu'];
        $declaration->prenomProprietaire = $validated['prenomProprietaire'];
        $declaration->typePiece = $validated['typePiece'];                
        $declaration->email = $validated['email'];
        $declaration->etat = -1;
        $declaration->structureDeclarer = $structureDeclarer;
        $declaration->date_declarer = now()->format('d-m-Y');
        $declaration->date_perte = $validated['date_perte']; 
        $declaration->save();

        //cette boue de code c pour envoyer mail apres declaration
        Mail::send('emails.test', ['nom' => $declaration->nomProprietaire, 'declaration' => $declaration], function ($message) use ($declaration) {
            $message->to($declaration->email)
                    ->subject('Confirmation de Déclaration');
        });
        return response()->json(['message' => 'Déclaration créée et e-mail envoyé avec succès.'], 201);
    
    }
    

    public function getDeclarePerte(){

        $declarations = Declaration::where('etat',-1)->get();
        return response()->json($declarations);
    }


    public function indexbystrucPerteDoc()
    {
        // Récupération de l'utilisateur connecté
        $user = Auth::user();
        
        // Récupération des déclarations appartenant à la même structure que l'utilisateur
        $declarations = Declaration::where('structureDeclarer', $user->structure)->where('etat', -1)->get();
    
        return response()->json($declarations);
    }
    
    /** Mettre a jour une declaration lorsque qu'un utilisateur a retrouver sa piece */
    public function updateLostDoc(Request $request, string $id){
        $declaration = Declaration::find($id);

        $validated = $request->validate([
            'nomProprietaire' => 'required',
            'prenomProprietaire' => 'required',
            'lieu' => 'required',
            'typePiece' => 'required',
            'email' => 'required|email',
            'date_perte' => 'required|date',
        ]);

        

        if (!$declaration) {
            return response()->json(['message' => 'Déclaration non trouvée.'], 404);
        }

        $declaration->update($validated);

        return response()->json(['message' => 'Déclaration mise à jour avec succès.']);
    }

    /** Pour recuperer la declaration d'une piece perdue d'un utilisateur donnee */
    public function getDeclarByEmail(){
        $user = Auth::user();
        $declarations = Declaration::where('email', $user->email)->where('etat', -1)->get();
        return response()->json($declarations);
    }

    /** Pour recuperer et lister l'ensemble des pieces ramassees ayant des similitudes avec la piece declarer comme perdue */
    public function getpiecesimilaire(){
        $user = Auth::user();
        $declarations = Declaration::/*where('email', $user->email)->*/where('prenomProprietaire',$user->prenom)
        ->where('nomProprietaire',$user->nom)
        ->where('etat', 1)->get();
        return response()->json($declarations);
    }

}


