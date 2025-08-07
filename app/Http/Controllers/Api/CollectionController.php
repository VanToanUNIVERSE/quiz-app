<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CollectionResource;
use App\Models\Answer;
use App\Models\Collection;
use App\Models\Quiz;
use Illuminate\Http\Request;
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
        $collection = $request->collection;
        $newCl = Collection::create([
            'name' => $collection['name']
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
                    'correct' => $answer['correct'] == true ? 1 : 0,
                    'quiz_id' => $newQuiz->id
                ]);
            }
        }

        return response()->json([
            'message' => $answers
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
            'message' => 'List of collections',
            'data' => new CollectionResource($data)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
