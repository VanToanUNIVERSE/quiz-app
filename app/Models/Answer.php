<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Collection;

class Answer extends Model
{
    use HasFactory;
    protected $fillable = ['correct', 'content'];
    public function collection() {
        return $this->belongsTo(Collection::class);
    }
}
