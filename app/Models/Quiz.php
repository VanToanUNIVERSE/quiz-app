<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;
    protected $fillable = ['question', 'collection_id'];
    public function collection() {
        return $this->belongsTo(Collection::class);
    }
    public function answers() {
        return $this->hasMany(Answer::class);
    }
}
