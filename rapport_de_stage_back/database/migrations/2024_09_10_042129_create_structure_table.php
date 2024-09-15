<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('structure', function (Blueprint $table) {
            $table->id();
            $table->string('libelle',60);
            $table->unsignedBigInteger('type_structure');
            $table->foreign('type_structure')->references('id')->on('type_structure')->onUpdate('cascade')->onDelete('cascade');
            Schema::enableForeignKeyConstraints();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('structure');

        Schema::table('commande', function (Blueprint $table) {
            //
            Schema::disableForeignKeyConstraints();
            $table->dropForeign(['type_structure']);
        });
    }
};
