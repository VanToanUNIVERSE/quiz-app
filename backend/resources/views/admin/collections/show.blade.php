<h2>Chi tiết: {{ $collection->name }}</h2>
<p>Chủ sở hữu: {{ $collection->user->username ?? 'N/A' }}</p>
<a href="{{ route('admin.collections.index') }}">← Về danh sách</a>

@foreach($collection->quizzes as $quiz)
    <div style="border:1px solid #ccc; margin:10px; padding:10px">
        <strong>Câu hỏi: {{ $quiz->question }}</strong>
        <ul>
            @foreach($quiz->answers as $answer)
                <li>
                    {{ $answer->content }}
                    @if($answer->correct == 1) ✅ (đúng) @endif
                </li>
            @endforeach
        </ul>
        <form method="POST" action="{{ route('admin.quizzes.destroy', $quiz->id) }}"
            onsubmit="return confirm('Xóa câu này?')">
            @csrf
            @method('DELETE')
            <button type="submit">Xóa</button>
        </form>
    </div>
@endforeach