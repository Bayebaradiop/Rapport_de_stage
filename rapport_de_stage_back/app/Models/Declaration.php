<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Declaration extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomProprietaire',
        'prenomProprietaire',
        'lieu',
        'typePiece',
        	'email',
          'structureDeclarer',
            'etat',
              'date_declarer',
              'date_ramassage',
    ];

}
