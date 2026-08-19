<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    
    use HasFactory;
    protected $fillable = ['name', 'user_id'];
    public function quizzes() {
        return $this->hasMany(Quiz::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
}
