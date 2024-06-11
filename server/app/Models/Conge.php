<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conge extends Model
{
    use HasFactory;


    protected $casts = [
        'date_debut' => 'datetime:Y-m-d\TH:i:sP',
        'date_fin' => 'datetime:Y-m-d\TH:i:sP',
    ];


    public function types()
    {
        return $this->hasMany(Type::class);
    }

    public function userValidations()
    {
        return $this->belongsToMany(User::class, 'validations');
    }

    public function userDemandes()
    {
        return $this->belongsToMany(User::class, 'demandes');
    }
}
