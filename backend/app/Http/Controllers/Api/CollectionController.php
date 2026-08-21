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
    public function show(Collection $collection)
    {
        $collection->loadCount('quizzes');
        return response()->json([
            'status' => 'success',
            'message' => 'Collection ' . $collection->id,
            'data' => new CollectionResource($collection)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function update(Request $request, Collection $collection)
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

        if ($collection->user_id != $userId) {
            return response()->json([
                'message' => 'You cannot edit this collection'
            ], 403);
        }
        $newCollection = $request->collection;

        DB::transaction(function () use ($collection, $newCollection) {
            //1.cập nhật name
            $collection->update([
                'name' => $newCollection['name']
            ]);
            //2. xóa quiz cũ
            $collection->quizzes()->delete();

            //3. tạo lại
            $quizzes = $newCollection['quizzes'];
            foreach ($quizzes as $quiz) {
                $newQuiz = Quiz::create([
                    'question' => $quiz['question'],
                    'collection_id' => $collection->id
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
