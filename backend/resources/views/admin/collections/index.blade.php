<h2>Quản lý Collection</h2>
<table border="1" cellpadding="8">
    <tr>
        <th>ID</th>
        <th>Tên bộ</th>
        <th>Chủ sở hữu</th>
        <th>Số câu hỏi</th>
        <th>Ngày tạo</th>
        <th>Thao tác</th>
    </tr>
    @foreach($collections as $collection)
        <tr>
            <td>{{ $collection->id }}</td>
            <td>{{ $collection->name }}</td>
            <td>{{ $collection->user->fullName ?? "N/A"}}</td>
            <td>{{ $collection->quizzes_count }}</td>
            <td>{{ $collection->created_at }}</td>
            <td>
                <form method="POST" action="{{ route('admin.collections.destroy', $collection->id) }}"
                    onsubmit="return confirm('Xóa collection này?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Xóa</button>
                </form>
                <form method="POST" action="{{ route('admin.collections.show', $collection->id) }}">
                    @csrf
                    @method('PUT')
                    <button type="submit">Xem chi tiết</button>
                </form>
            </td>
        </tr>
    @endforeach
</table>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif
@error('delete')
    <p style="color:red">{{ $message }}</p>
@enderror
