<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CollectionResource;
use App\Models\Answer;
use App\Models\Collection;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPUnit\TestRunner\TestResult\Collector;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Collection::withCount('quizzes')->paginate(5);
        return response()->json([
            'status' => 'success',
            'message' => 'List of collections',
            'data' => CollectionResource::collection($data),
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'total' => $data->total(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = $request->userId;
        $collection = $request->collection;
        $newCl = Collection::create([
            'name' => $collection['name'],
            'user_id' => $userId
        ]);

        $quizzes = $collection['quizzes'];
        foreach ($quizzes as $quiz) {
            $newQuiz = Quiz::create([
                'question' => $quiz['question'],
                'collection_id' => $newCl->id
            ]);
            $answers = $quiz['answers'];
            foreach ($answers as $answer) {
                Answer::create([
                    'content' => $answer['content'],
                    'correct' => $answer['correct'] === 'true' ? 1 : 0,
                    'quiz_id' => $newQuiz->id
                ]);
            }
        }

        return response()->json([
            'message' => 'Created'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $data = Collection::withCount('quizzes')->find($request->id);
        return response()->json([
            'status' => 'success',
            'message' => 'Collection ' . $data->id,
            'data' => new CollectionResource($data)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $userId = $request->userId;
        $oldCollection = Collection::find($request->collectionId);
        $newCollection = $request->collection;


        $oldCollection->update([
            'name' => $newCollection['name']
        ]);



        $oldQuizzes = $oldCollection->quizzes;
        $newQuizzes = $newCollection['quizzes'];
        if (count($newQuizzes) != count($oldQuizzes)) {
            if (count($newQuizzes) > count($oldQuizzes)) {
                for ($i = count($oldQuizzes); $i < count($newQuizzes); $i++) {
                    $newQuiz = Quiz::create([
                        'question' => $newQuizzes[$i]['question'],
                        'collection_id' => $request->collectionId
                    ]);
                    $answers = $newQuizzes[$i]['answers'];
                    foreach ($answers as $answer) {
                        Answer::create([
                            'content' => $answer['content'],
                            'correct' => $answer['correct'] === 'true' || $answer['correct'] === 1 ? 1 : 0,
                            'quiz_id' => $newQuiz->id
                        ]);
                    }
                }
            }
            if (count($newQuizzes) < count($oldQuizzes)) {
                for ($i = count($newQuizzes); $i < count($oldQuizzes); $i++) {
                    $oldQuizzes[$i]->delete();
                }
            }
        }
        for ($i = 0; $i < count($oldQuizzes); $i++) {
            $oldQuizzes[$i]->update($newQuizzes[$i]);
            $oldAnswers = $oldQuizzes[$i]->answers;
            $newAnswers = $newQuizzes[$i]['answers'];
            for ($j = 0; $j < count($oldAnswers); $j++) {
                $oldAnswers[$j]->update([
                    'content' => $newAnswers[$j]['content'],
                    'correct' => $newAnswers[$j]['correct'] === 'true' || $newAnswers[$j]['correct'] === 1 ? 1 : 0,
                ]);
            }
        }
        return response()->json([
            'message' => 'Update completed',
            'status' => true
        ]);
        /* $collection = $request->collection;
        $newCl = Collection::create([
            'name' => $collection['name'],
            'user_id' => $userId
        ]); 

        $quizzes = $collection['quizzes'];
        foreach($quizzes as $quiz) {
            $newQuiz = Quiz::create([
                'question' => $quiz['question'],
                'collection_id' => $newCl->id
            ]);
            $answers = $quiz['answers'];
            foreach($answers as $answer) {
                Answer::create([
                    'content' => $answer['content'],
                    'correct' => $answer['correct'] === 'true' ? 1 : 0,
                    'quiz_id' => $newQuiz->id
                ]);
            }
        }

        return response()->json([
            'message' => $answers
        ]); */
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
