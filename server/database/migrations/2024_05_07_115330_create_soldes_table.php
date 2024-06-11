<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('soldes', function (Blueprint $table) {
            $table->id();
            $table->integer('nombre_jour');
            $table->string('solde');
            $table->timestamps();
        });

        DB::table('soldes')->insert([
            'nombre_jour' => 5,
            'solde' => 'Solde minimum',
        ]);
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('soldes');
    }
};
