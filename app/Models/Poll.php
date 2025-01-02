<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Poll extends Model
{
    public function votes()
	{
		return $this->hasMany(Vote::class);
	}

	// Poll Model
	public function countVotesByOption()
	{
		// Get all the votes related to this poll
		$votes = $this->votes;
	
		// Count the total number of votes for this poll
		$totalVotes = $votes->count();
	
		// Group the votes by option_id and count them
		$voteCounts = $votes->groupBy('option_id')->map(function ($group) {
			return $group->count(); // Count the number of votes for each option
		});
	
		// Get the options with their names and the corresponding vote count
		$result = $voteCounts->map(function ($votesCount, $optionId) use ($totalVotes) {
			// Find the option by its ID
			$option = Option::find($optionId);
			return [
				'id' => $option->id, // Option name
				'option' => $option->name, // Option name
				'votes_count' => $votesCount, // Vote count
			];
		});
	
		// Return the result along with totalVotes as separate key
		return response()->json([
			'options' => $result,
			'totalVotes' => $totalVotes,
		]);
	}
}
