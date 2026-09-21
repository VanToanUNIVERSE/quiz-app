<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlayQuizResource;
use App\Http\Resources\QuizResource;
use App\Models\GameSession;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        if ($totalQuizzes < $maxQuizzes) {
            return response()->json(['error' => 'Not enough quizzes available to start a game session.'], 400);
        }
        // Generate a unique room code
        do {
            $roomCode = strtoupper(Str::random(6));
        } while (GameSession::where('room_code', $roomCode)->exists());
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
    public function show(Request $request, GameSession $gameSession)
    {

        if ($gameSession->player1_id != $request->user()->id && $gameSession->player2_id != $request->user()->id) {
            return response()->json(['message' => 'You are not allowed to view this game session.'], 403);
        }
        if ($gameSession->status === 'waiting') {
            return response()->json([
                'message' => 'Waiting for players to join',
                'id' => $gameSession->id,
                'roomCode' => $gameSession->room_code,
                'status' => $gameSession->status,
                'player1_id' => $gameSession->player1_id,
                'player2_id' => $gameSession->player2_id,
            ], 200);
        }
        if ($gameSession->status === 'playing') {
            if ($gameSession->current_index >= count($gameSession->quiz_ids)) {
                return response()->json([
                    'message' => 'Index of quiz is out of range',
                    'id' => $gameSession->id,
                    'roomCode' => $gameSession->room_code,
                    'status' => $gameSession->status,
                    'player1_id' => $gameSession->player1_id,
                    'player2_id' => $gameSession->player2_id,
                ], 200);
            }
            $currentQuiz = Quiz::find($gameSession->quiz_ids[$gameSession->current_index]);
            if (!$currentQuiz) {
                return response()->json([
                    'message' => 'Invalid quiz id',

                ], 409);

            }
            return response([
                'message' => 'Game session is playing',
                'id' => $gameSession->id,
                'roomCode' => $gameSession->room_code,
                'status' => $gameSession->status,
                'player1_id' => $gameSession->player1_id,
                'player2_id' => $gameSession->player2_id,
                'player1_hp' => $gameSession->player1_hp,
                'player2_hp' => $gameSession->player2_hp,
                'winner_id' => $gameSession->winner_id,
                'answered_by' => $gameSession->answered_by,
                'currentIndex' => $gameSession->current_index,
                'question_started_at' => $gameSession->question_started_at,
                'currentQuiz' => new PlayQuizResource($currentQuiz)
            ], 200);
        }
        if ($gameSession->status === 'finished') {
            return response()->json([
                'message' => 'Game session is finished',
                'id' => $gameSession->id,
                'roomCode' => $gameSession->room_code,
                'status' => $gameSession->status,
                'player1_id' => $gameSession->player1_id,
                'player2_id' => $gameSession->player2_id,
                'player1_hp' => $gameSession->player1_hp,
                'player2_hp' => $gameSession->player2_hp,
                'winner_id' => $gameSession->winner_id,
                'currentQuiz' => null
            ], 200);
        }
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

    public function join(Request $request, string $roomCode)
    {
        $roomCode = strtoupper($roomCode);
        DB::transaction(function () use ($request, $roomCode) {
            $gameSession = GameSession::where('room_code', $roomCode)->lockForUpdate()->first();
            if (!$gameSession) {
                abort(404, 'Invalid room code.');
            }
            $player1Id = $gameSession->player1_id;
            if ($request->user()->id === $player1Id) {
                abort(403, 'You cannot join this game session.');
            }
            if ($gameSession->status !== 'waiting') {
                abort(409, 'Game session is already in progress.');
            }
            if ($gameSession->player2_id) {
                abort(409, 'Game session is already full.');
            }
            $gameSession->player2_id = $request->user()->id;
            $gameSession->status = 'playing';
            $gameSession->question_started_at = now();
            $gameSession->update();
        });
        return response()->json(['message' => 'Game session joined successfully.'], 200);
    }
}
