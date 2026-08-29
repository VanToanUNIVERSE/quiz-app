<!DOCTYPE html>
<html>
<head><title>Admin Login</title></head>
<body>
    <h2>Đăng nhập Admin</h2>
    @error('login')
        <p style="color:red">{{ $message }}</p>
    @enderror
    <form method="POST" action="/admin/login">
        @csrf
        <input type="text" name="username" placeholder="Tài khoản" value="{{ old('username') }}">
        <input type="password" name="password" placeholder="Mật khẩu">
        <button type="submit">Đăng nhập</button>
    </form>
</body>
</html>