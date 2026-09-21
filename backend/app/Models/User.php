<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; 
    protected $fillable = ['username', 'password', 'fullName', 'image', 'role'];
    protected $hidden = ['password'];
    public function collections() {
        return $this->hasMany(Collection::class);
    }

    public function gameAsPlayer1() {
        return $this->hasMany(GameSession::class, 'player1_id');
    }

    public function gameAsPlayer2() {
        return $this->hasMany(GameSession::class, 'player2_id');
    }

    public function gameAsWinner() {
        return $this->hasMany(GameSession::class, 'winner_id');
    }
}
