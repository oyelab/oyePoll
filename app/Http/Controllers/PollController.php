<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Poll;
use App\Models\Option;
use App\Models\Vote;
use Inertia\Inertia;
use Inertia\Response;

class PollController extends Controller
{
	public function showPoll()
    {
		$poll = Poll::orderBy('id', 'desc')->firstOrFail();
        $options = Option::get(); // Get the first poll with options

        return Inertia::render('Home', [
            'poll' => $poll,
            'options' => $options, // Pass options to the frontend
        ]);
    }

	public function submitVote(Request $request)
	{
		// Validate the request
		$validated = $request->validate([
			'poll_id' => 'required|exists:polls,id',
			'option_id' => 'required|exists:options,id', // Ensure the selected option exists
		]);

		// Record the vote
		Vote::create([
			'poll_id' => $request->poll_id,
			'option_id' => $request->option_id,
			'user_id' => auth()->id(), // Assuming user authentication is required
		]);

		// Get the poll
		$poll = Poll::findOrFail($request->poll_id);

		// Get the vote counts for each option
		$voteCounts = $poll->countVotesByOption();

		// Return the updated poll results
		return response()->json([
			'options' => $voteCounts,
		]);
	}

	public function showResults()
    {
		$poll = Poll::orderBy('id', 'asc')->firstOrFail();
		$voteCounts = $poll->countVotesByOption();
		// Return the updated poll results
		return response()->json([
			'options' => $voteCounts,
		]);
    }

	


	

	public function getResults($pollId)
	{
		$poll = Poll::findOrFail($pollId);
		$options = Option::all();

		$results = $options->map(function ($option) use ($pollId) {
			return [
				'id' => $option->id,
				'name' => $option->name,
				'vote_count' => Vote::where('poll_id', $pollId)
					->where('option_id', $option->id)
					->count(),
			];
		});

		return response()->json([
			'poll' => $poll,
			'results' => $results,
		]);
	}


}
