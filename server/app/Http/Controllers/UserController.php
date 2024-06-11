<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{

    // ==================================================================
    //  Récupération de tous les utilisateurs avec ses soldes respectifs
    // ==================================================================
    public function allUser()
    {
        // $users = User::with('soldes')->get();
        $users = DB::select('SELECT u.id, u.name, u.email, u.contact, u.poste, u.photo,u.is_admin, u.solde FROM users AS u ORDER BY u.id DESC');
        return response()->json([
            "data" => $users,
            "message" => "Liste de tous les personnels"
        ]);
    }


    // =========================
    //  Recuperer un utilisateur
    // =========================
    public function show($id)
    {
        $user = User::find($id);
        return response()->json([
            "data" => $user
        ]);
    }

    // ===================
    //  Editer utilisateur
    // ===================
    public function edit(Request $request, $id)
    {
        $request->validate([
            "name" => 'required|min:4',
            "email" => 'required|email',
            "contact" => 'required|min:10',
            "poste" => 'required',
            // "photo" => 'required|image|mimes:jpg,png,jpeg|size:2048',
        ]);

        // $imageName = $request->photo->getClientOriginalExtension();

        $user = DB::table('users')
            ->where('id', $id)
            ->update([
                "name" => $request->name,
                "email" => $request->email,
                "contact" => $request->contact,
                "poste" => $request->poste,
                // "photo" => $imageName,
            ]);

        // Storage::disk('public')->put($imageName, file_get_contents($request->photo));

        if ($user) {
            return response()->json([
                "message" => "Utilisateur édité!!"
            ]);
        } else {
            return response()->json([
                "message" => "Echec de la modification !!"
            ]);
        }
    }

    // ==================
    //  Set user to Admin
    // ==================
    public function setUserToAdmin($id)
    {
        DB::update('UPDATE users SET is_admin = 1 WHERE id = ?', [$id]);
        return response()->json([
            "message" => "Mis à jour effectué !!"
        ]);
    }

    // =========================
    //  Supprimer un utilisateur
    // =========================
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json([
            "data" => "Utilisateur supprimé!!"
        ]);
    }

    // ===========================================================================
    //  Récuperer le solde et le nombre des demandes effectués par un utilisateur
    // ===========================================================================
    public function getUserSoldesWithNombreDemandesEffectues($id)
    {
        $demandes_eff = DB::select('SELECT COUNT(*) AS demandes_effectues FROM demandes WHERE user_id= ?', [$id]);
        $solde = DB::select('SELECT u.solde AS nombre_jour FROM users AS u WHERE u.id = ?', [$id]);
        return response()->json(
            [
                "demandes" => $demandes_eff[0],
                "solde" => $solde[0],
            ]
        );
    }

    // ===================================================================================
    //  Récuperer le nombre total des demandes(validés, en attentes, refusés) par un admin
    // ===================================================================================
    public function getStatisticDemandes()
    {
        $valid = DB::select('SELECT COUNT(*) AS nbre_valid from demandes WHERE status = 1');
        $refus = DB::select('SELECT COUNT(*) AS nbre_refus from demandes WHERE status = -1');
        $attentes = DB::select('SELECT COUNT(*) AS nbre_attentes from demandes WHERE status = 0');

        return response()->json([
            'valid' => $valid[0],
            'refus' => $refus[0],
            'attentes' => $attentes[0]
        ]);
    }
}
