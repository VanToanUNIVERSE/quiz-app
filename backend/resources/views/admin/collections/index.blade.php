@extends('admin.layout')

@section('title', 'Quản lý Collection')

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

    <h2 class="text-2xl font-bold mb-4">Quản lý Collection</h2>
    <table border="1" cellpadding="8" class="w-full bg-white shadow rounded">
        <thead class="bg-gray-200">
            <tr class="border-t hover:bg-gray-50">
                <th class="p-3 text-left">ID</th>
                <th class="p-3 text-left">Tên bộ</th>
                <th class="p-3 text-left">Chủ sở hữu</th>
                <th class="p-3 text-left">Số câu hỏi</th>
                <th class="p-3 text-left">Ngày tạo</th>
                <th class="p-3 text-left">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            @foreach($collections as $collection)
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-3">{{ $collection->id }}</td>
                    <td class="p-3">{{ $collection->name }}</td>
                    <td class="p-3">{{ $collection->user->fullName ?? "N/A"}}</td>
                    <td class="p-3">{{ $collection->quizzes_count }}</td>
                    <td class="p-3">{{ $collection->created_at }}</td>
                    <td class="p-3">
                        <div class="flex items-center gap-3">
                            <form method="POST" action="{{ route('admin.collections.destroy', $collection->id) }}"
                                onsubmit="return confirm('Xóa collection này?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit"
                                    class="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-lg">Xóa</button>
                            </form>
                            <a class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-lg"
                                href="{{ route('admin.collections.show', $collection->id) }}">Xem</a>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection