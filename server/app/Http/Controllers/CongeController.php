<?php

namespace App\Http\Controllers;

use App\Mail\MailForCongeValid;
use App\Models\Conge;
use App\Models\Type;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CongeController extends Controller
{
    // ==================================
    // RECUPERER TOUS LES TYPES DE CONGES
    // ==================================
    public function getAllTypes()
    {
        $types = Type::all();
        return response()->json([
            "data" => $types
        ]);
    }
    // =============
    // AJOUTER CONGE
    // =============
    public function addConge(Request $request)
    {

        $request->validate([
            "motif" => 'required|string',
            "date_debut" => 'required|date',
            "date_fin" => 'required|date|after_or_equal:date_debut',
            "type_id" => 'required|exists:types,id',
            "user_id" => 'required|exists:users,id',
        ]);

        try {
            $conge = new Conge();
            $conge->motif = $request->motif;
            $conge->date_debut = $request->date_debut;
            $conge->date_fin = $request->date_fin;
            $conge->type_id = $request->type_id;
            $conge->save();

            $start = Carbon::parse($request->date_debut);
            $end = Carbon::parse($request->date_fin);
            $differenceInDays = $start->diffInDays($end);


            DB::insert('INSERT into demandes(status, user_id, conge_id, created_at, updated_at) values (?, ?, ?, ?, ?)', [0, $request->user_id, $conge->id, now(), now()]);
            return response()->json([
                "message" => "Congé ajouté!!",
                "diff" => $differenceInDays
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => $e
            ]);
        }
    }

    // ===========================
    // RECUPERER TOUS LES DEMANDES
    // ===========================
    public function getAllDemandes()
    {
        $demandes = DB::select('SELECT u.name, u.poste, c.date_debut, c.date_fin, c.motif, t.type ,d.status FROM `demandes` AS d,`users` AS u,`conges` AS c, `types` AS t WHERE(c.id = d.conge_id) AND (u.id = d.user_id) AND (t.id = c.type_id)  ORDER BY d.updated_at DESC');
        return response()->json([
            "data" => $demandes
        ]);
    }

    // ========================================================
    // RECUPERER TOUS LES DEMANDES FAIT PAR CHAQUE UTILISATEUR
    // ========================================================
    public function getAllDemandesByUser($id)
    {
        $demandes = DB::select('SELECT u.name, u.poste, c.date_debut, c.date_fin, c.motif, t.type ,d.status FROM `demandes` AS d,`users` AS u,`conges` AS c, `types` AS t WHERE(c.id = d.conge_id) AND (u.id = d.user_id) AND (t.id = c.type_id) AND  u.id= ? ORDER BY d.updated_at', [$id]);
        return response()->json([
            "data" => $demandes
        ]);
    }

    // =======================================
    // RECUPERER TOUS LES DEMANDES EN ATTENTES
    // =======================================
    public function getAllDemandesEnAttentes()
    {
        $demandes = DB::select('SELECT  d.id, u.name, u.poste, c.date_debut, c.date_fin, c.motif, t.type ,d.status FROM `demandes` AS d,`users` AS u,`conges` AS c, `types` AS t WHERE(c.id = d.conge_id) AND (u.id = d.user_id) AND (t.id = c.type_id) AND d.status=0  ORDER BY d.id DESC');
        return response()->json([
            "data" => $demandes
        ]);
    }


    // =======================================================
    // RECUPERER TOUS LES INFORMATIONS DU CONGE D'UN PERSONNEL
    // =======================================================
    public function getUserInfoCongeToPutInCalendar()
    {
        $infos = DB::select('SELECT u.name, c.id, c.date_debut, c.date_fin, t.type FROM conges AS c ,types AS t, demandes AS d, users AS u WHERE(c.type_id = t.id) AND (d.conge_id = c.id) AND (d.user_id = u.id) AND d.status = 1');
        return response()->json([
            "data" => $infos
        ]);
    }


    // ===============================
    // VALIDER LE CONGE D'UN PERSONNEL
    // ===============================
    public function validateConge($id)
    {
        DB::beginTransaction();
        try {
            $demande = DB::table('demandes')
                ->join('conges', 'demandes.conge_id', '=', 'conges.id')
                ->join('users', 'demandes.user_id', '=', 'users.id')
                ->where('demandes.id', $id)
                ->select('demandes.*', 'conges.date_debut', 'conges.date_fin', 'users.solde', 'users.email')
                ->first();

            if (!$demande) {
                return response()->json(["message" => "Demandes introuvable!!!"]);
            }

            $start = new \DateTime($demande->date_debut);
            $end = new \DateTime($demande->date_fin);
            $interval = $start->diff($end)->days;


            if ($demande->solde >= $interval) {
                DB::table('users')
                    ->where('id', $demande->user_id)
                    ->decrement('solde', $interval);

                DB::table('demandes')
                    ->where('id', $id)
                    ->update(["status" => 1]);
            } else {
                return "tay";
                // return response()->json(["message" => "Solde insuffisant!!!"]);
            }

            DB::commit();


            // Mail::to($demande->)->send(new MailForCongeValid());

            return response()->json([
                "message" => "Congé validé!!!",
                "data" => $demande
            ]);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    // ===============================
    // REFUSER LE CONGE D'UN PERSONNEL
    // ===============================
    public function refuseConge($id)
    {
        DB::update('UPDATE demandes SET status = -1 WHERE id = ?', [$id]);
        return response()->json([
            "message" => "Congé refusé"
        ]);
    }
}
