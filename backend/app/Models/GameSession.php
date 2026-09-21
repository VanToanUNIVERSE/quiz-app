<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
    use HasFactory;

    protected $fillable = [
        "room_code",
        "player1_id",
        "player2_id",
        "player1_hp",
        "player2_hp",
        "quiz_ids",
        "current_index",
        "answered_by",
        "question_started_at",
        "status",
        "winner_id"
    ];

    protected $casts = [
        'quiz_ids' => 'array',
        'question_started_at' => 'datetime',
        'player1_hp' => 'integer',
        'player2_hp' => 'integer',
        'player1_id' => 'integer',
        'player2_id' => 'integer',
    ];

    public function player1()
    {
        return $this->belongsTo(User::class, 'player1_id');
    }

    public function player2()
    {
        return $this->belongsTo(User::class, 'player2_id');
    }

    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }
}
