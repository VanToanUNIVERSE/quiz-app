<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CollectionResource;
use App\Models\Answer;
use App\Models\Collection;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function store(Request $request)
    {
        $request->validate([
            'collection' => 'required|array',
            'collection.name' => 'required|string|max:255',
            'collection.quizzes' => 'required|array',
            'collection.quizzes.*.question' => 'required|string|max:255',
            'collection.quizzes.*.answers' => 'required|array',
            'collection.quizzes.*.answers.*.content' => 'required|string|max:255',
            'collection.quizzes.*.answers.*.correct' => 'required|in:true,false',
        ]);
        $userId = $request->user()->id;
        $collection = $request->collection;
        $quizzes = $collection['quizzes'];
        DB::transaction(function () use ($userId, $collection, $quizzes) {
            $newCl = Collection::create([
                'name' => $collection['name'],
                'user_id' => $userId
            ]);
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
        });
        return response()->json([
            'message' => 'Created',
            'status' => true
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

    public function update(Request $request)
    {
        $userId = $request->userId;
        $oldCollection = Collection::find($request->collectionId);
        $request->validate([
            'collection.name' => 'required|max:255'
        ]);
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $collection = Collection::find($id);
        $collection->delete();
        return response()->json([
            'message' => 'Collection ' . $collection->name . ' has been deleted'
        ]);
    }
}
