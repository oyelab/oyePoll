<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    // An option can have many votes
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
