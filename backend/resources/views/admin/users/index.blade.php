@extends('admin.layout')

@section('title', 'Quản lý User')

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
    @error('role')
        <p class="absolute top-1 left-1/2 -translate-x-1/2 p-3 rounded bg-red-100 border border-red-500">
            {{ $message }}
        </p>
    @enderror
    <h2 class="text-2xl font-bold mb-4">Quản lý User</h2>

    <table class="w-full bg-white shadow rounded">
        <thead class="bg-gray-200">
            <tr>
                <th class="p-3 text-left">ID</th>
                <th class="p-3 text-left">Username</th>
                <th class="p-3 text-left">Role</th>
                <th class="p-3 text-left">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-3">{{ $user->id }}</td>
                    <td class="p-3">{{ $user->username }}</td>
                    <td class="p-3">{{ $user->role }}</td>
                    <td class="p-3">
                        <div class="flex items-center gap-3">
                            <form method="POST" action="{{ route('admin.users.update', $user->id) }}">
                                @csrf
                                @method('PUT')
                                <select name="role" onchange="this.form.submit()"
                                    class=" bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-lg">
                                   
                                        <option value="user" {{ $user->role == 'user' ? 'selected' : '' }}>User</option>
                                        <option value="admin" {{ $user->role == 'admin' ? 'selected' : '' }}>Admin</option>
                                   
                                    
                                </select>
                            </form>
                            <form method="POST" action="{{ route('admin.users.destroy', $user->id) }}"
                                onsubmit="return confirm('Xóa user này?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit"
                                    class="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-lg">Xóa</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection