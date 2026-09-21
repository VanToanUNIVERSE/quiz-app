<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameSession;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GameSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $maxQuizzes = 19;
        $totalQuizzes = Quiz::count();
        // Check if there are enough quizzes to start a game session
        if($totalQuizzes < $maxQuizzes) {
            return response()->json(['error' => 'Not enough quizzes available to start a game session.'], 400);
        }
        // Generate a unique room code
        do {
            $roomCode = strtoupper(Str::random(6));
        }while (GameSession::where('room_code', $roomCode)->exists());
        $quizIds = Quiz::inRandomOrder()->limit($maxQuizzes)->pluck('id')->toArray();
        $gameSession = GameSession::create([
            'room_code' => $roomCode,
            'player1_id' => $request->user()->id,
            'player2_id' => null,
            'player1_hp' => 100,
            'player2_hp' => 100,
            'quiz_ids' => $quizIds,
            'current_index' => 0,
            'answered_by' => null,
            'question_started_at' => null,
            'status' => 'waiting',
            'winner_id' => null,
        ]);
        return response()->json($gameSession, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
