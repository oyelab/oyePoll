<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
	// Protect the mass-assignment by defining fillable fields
    protected $fillable = [
        'poll_id',
        'option_id',
        'user_id',
    ];
	
    // A vote belongs to an option
    public function option()
    {
        return $this->belongsTo(Option::class);
    }

    // A vote belongs to a poll
    public function poll()
    {
        return $this->belongsTo(Poll::class);
    }

    // A vote belongs to a user (optional)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
