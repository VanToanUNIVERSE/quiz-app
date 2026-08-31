@extends('admin.layout')

@section('title', 'Xem collection')

@section('content')

    @if(session('success'))
        <p class="absolute top-1 left-1/2 -translate-x-1/2 p-3 rounded bg-green-100 border border-green-500">
            {{ session('success') }}
        </p>
    @endif
    @error('delete')
        <p class="absolute top-1 left-1/2 -translate-x-1/2 p-3 rounded bg-red-100 border border-red-500">
            {{ $message }}
        </p>
    @enderror

    <h2 class="text-2xl font-bold mb-4">Chi tiết: {{ $collection->name }}</h2>
    <p class="text-2xl font-bold mb-4">Chủ sở hữu: {{ $collection->user->username ?? 'N/A' }}</p>
    <a href="{{ route('admin.collections.index') }}"
        class="bg-blue-600 inline-block mb-4 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-lg">← Về danh sách</a>

    @foreach($collection->quizzes as $quiz)
        <div class="flex flex-col gap-3 border rounded p-3">
            <strong>Câu hỏi: {{ $quiz->question }}</strong>
            <ul class="flex gap-3">
                @foreach($quiz->answers as $answer)
                    <li class="border rounded p-3 {{ $answer->correct == 1 ? 'bg-green-200' : 'bg-red-200' }}">
                        {{ $answer->content }}
                    </li>
                @endforeach
            </ul>
            <form method="POST" action="{{ route('admin.quizzes.destroy', $quiz->id) }}"
                onsubmit="return confirm('Xóa câu này?')">
                @csrf
                @method('DELETE')
                <button type="submit"
                    class="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-lg">Xóa</button>
            </form>
        </div>
    @endforeach
@endsection