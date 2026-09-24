<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlayQuizResource;
use App\Http\Resources\QuizResource;
use App\Models\Answer;
use App\Models\GameSession;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

    public function answer(Request $request, GameSession $gameSession)
    {
        $request->validate([
            'answer_id' => 'required|exists:answers,id'
        ]);

        $data = DB::transaction(function () use ($request, $gameSession) {
            $gameSession = GameSession::where('id', $gameSession->id)->lockForUpdate()->first();
            $answer = Answer::find($request->answer_id);
            if (!$answer) {
                abort(404, 'Invalid answer id.');
            }
            if ($gameSession->player1_id != $request->user()->id && $gameSession->player2_id != $request->user()->id) {
                abort(403, 'You are not allowed to answer this game session.');
            }
            if ($gameSession->status !== 'playing') {
                abort(409, 'Game session is not in playing status.');
            }
            if ($gameSession->question_started_at == null) {
                abort(409, 'Dont have start time');
            }
            $questionEndAt = $gameSession->question_started_at->copy()->addSeconds(15);
            if (now()->greaterThanOrEqualTo($questionEndAt)) {
                abort(409, 'Out of time to answer.');
            }
            if ($gameSession->answered_by) {
                abort(409, 'This question has already been answered');
            }
            if ($gameSession->current_index >= count($gameSession->quiz_ids)) {
                abort(409, 'Index of quiz is out of range.');
            }
            if ($answer->quiz_id != $gameSession->quiz_ids[$gameSession->current_index]) {
                abort(409, 'Id of answer is invalid.');
            }
            
            $gameSession->answered_by = $request->user()->id;//Nếu chưa có ai trả lời thì gán người trả lời là user hiện tại để khóa không chep người sau trả lời
            $last_answered_by = $request->user()->id;
            //Trừ hp
            if ($answer->correct) {
                if ($request->user()->id == $gameSession->player1_id) {
                    $gameSession->player2_hp -= 10;
                }
                if ($request->user()->id == $gameSession->player2_id) {
                    $gameSession->player1_hp -= 10;
                }
            } else {
                if ($request->user()->id == $gameSession->player1_id) {
                    $gameSession->player1_hp -= 10;
                }
                if ($request->user()->id == $gameSession->player2_id) {
                    $gameSession->player2_hp -=  10;
                }
            }
            //không cho phép hp < 0
            $gameSession->player1_hp = max($gameSession->player1_hp, 0);
            $gameSession->player2_hp = max($gameSession->player2_hp, 0);
            //Xét ai là người chiến thắng
            if ($gameSession->player1_hp <= 0 || $gameSession->player2_hp <= 0) {
                $gameSession->winner_id = null;
                if ($gameSession->player1_hp <= 0 && $gameSession->player2_hp > 0) {
                    $gameSession->winner_id = $gameSession->player2_id;
                }
                if ($gameSession->player2_hp <= 0 && $gameSession->player1_hp > 0) {
                    $gameSession->winner_id = $gameSession->player1_id;
                }
                $gameSession->status = 'finished';
                $gameSession->question_started_at = null;
            }

            if ($gameSession->status != 'finished') {
                $gameSession->current_index++; //dời câu hỏi sau câu kê
                $gameSession->answered_by = null; //trả về null để tiếp tục câu kế tiếp
                $gameSession->question_started_at = now(); //đếm lại thời gian khi bắt đầu câu kế tiếp
            }
            $gameSession->update(); //cập nhật gameSession
            return (object) [
                'message' => 'Answer submitted successfully.',
                'correct' => $answer->correct,
                'last_answered_by' => $last_answered_by,
                'player1_hp' => $gameSession->player1_hp,
                'player2_hp' => $gameSession->player2_hp,
                'status' => $gameSession->status, 
                'winner_id' => $gameSession->winner_id,
                'current_index' => $gameSession->current_index,
                'question_started_at' => $gameSession->question_started_at,
            ];
        });
    
        return response()->json([
            'message' => $data->message,
            'is_correct' => $data->correct,
            'last_answered_by' => $data->last_answered_by,
            'player1_hp' => $data->player1_hp,
            'player2_hp' => $data->player2_hp,
            'status' => $data->status,
            'winner_id' => $data->winner_id,
            'current_index' => $data->current_index,
            'question_started_at' => $data->question_started_at,
        
        ]);
    }
}
