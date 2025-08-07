<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Collection;

class Answer extends Model
{
    use HasFactory;
    protected $fillable = ['correct', 'content', 'quiz_id'];
    public function quiz() {
        return $this->belongsTo(Quiz::class);
    }
}
