<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PollController;
use App\Models\Poll;
use App\Models\Option;
use App\Models\Vote;


Route::get('/', [PollController::class, 'showPoll']); // Show Poll

Route::get('/results', [PollController::class, 'showResults']); // Show Poll

Route::post('/submit-vote', [PollController::class, 'submitVote']);

require __DIR__.'/auth.php';
