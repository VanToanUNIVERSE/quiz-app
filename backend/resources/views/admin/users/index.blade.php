<h2>Quản lý User</h2>
<table border="1" cellpadding="8">
    <tr><th>ID</th><th>Username</th><th>Role</th><th>Ngày tạo</th></tr>
    @foreach($users as $user)
        <tr>
            <td>{{ $user->id }}</td>
            <td>{{ $user->username }}</td>
            <td>{{ $user->role }}</td>
            <td>{{ $user->created_at }}</td>
        </tr>
    @endforeach
</table>