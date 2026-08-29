<h2>Quản lý User</h2>
<table border="1" cellpadding="8">
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Role</th>
        <th>Ngày tạo</th>
    </tr>
    @foreach($users as $user)
        <tr>
            <td>{{ $user->id }}</td>
            <td>{{ $user->username }}</td>
            <td>
                <form method="POST" action="{{ route('admin.users.update', $user->id) }}">
                    @csrf
                    @method('PUT')
                    <select name="role" onchange="this.form.submit()">
                        @if ($user->role == 'admin')
                        <option value="user">User</option>
                        <option value="admin" selected>Admin</option>
                        @endif
                        @if ($user->role != 'admin')
                        <option value="user" selected>User</option>
                        <option value="admin">Admin</option>
                        @endif
                    </select>
                </form>
            </td>
            <td>{{ $user->created_at }}</td>
            <td>
                <form method="POST" action="{{ route('admin.users.destroy', $user->id) }}"
                    onsubmit="return confirm('Xóa user này?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Xóa</button>
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
@error('role')
    <p style="color:red">{{ $message }}</p>
@enderror