<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('types', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->timestamps();
        });

        DB::insert('INSERT INTO types (type) VALUES (?)', ['Congé de maternité']);
        DB::insert('INSERT INTO types (type) VALUES (?)', ['Congé de paternité']);
        DB::insert('INSERT INTO types (type) VALUES (?)', ['Congé de maladie']);
        DB::insert('INSERT INTO types (type) VALUES (?)', ['Congé parentale']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('types');
    }
};
