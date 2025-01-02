<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('votes', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id') // The user who voted
				  ->nullable()
				  ->constrained()
				  ->onDelete('cascade');
			$table->foreignId('option_id') // The option the user voted for
				  ->constrained('options')
				  ->onDelete('cascade');
			$table->foreignId('poll_id') // The option the user voted for
				  ->constrained('polls')
				  ->onDelete('cascade');
			$table->timestamps();
		});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
