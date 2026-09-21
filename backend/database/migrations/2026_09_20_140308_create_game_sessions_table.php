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
        Schema::create('game_sessions', function (Blueprint $table) {
            $table->id();
            $table->string("room_code")->unique();
            $table->foreignId("player1_id")->constrained("users")->onDelete("cascade");
            $table->foreignId("player2_id")->nullable()->constrained("users")->nullOnDelete();
            $table->integer("player1_hp")->default(100);
            $table->integer("player2_hp")->default(100);
            $table->json("quiz_ids");
            $table->integer("current_index")->default(0);
            $table->foreignId("answered_by")->nullable()->constrained("users")->nullOnDelete();
            $table->timestamp("question_started_at")->nullable();
            $table->enum("status", ["waiting", "playing", "finished"])->default("waiting");
            $table->foreignId("winner_id")->nullable()->constrained("users")->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_sessions');
    }
};
