<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('declarations', function (Blueprint $table) {
            $table->id();
            $table->string('nomProprietaire',30);
            $table->string('prenomProprietaire',50);
            $table->string('typePiece',25);
            $table->string('lieu',40);
            $table->string('email',60);
            $table->string('structureDeclarer',60);
            $table->string('etat')->default(1);//par defaut 1:trouver -1:perdue 0:rendue
            $table->date('date_declarer')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->date('date_ramassage')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('declarations');
    }
};
