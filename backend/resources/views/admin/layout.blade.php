<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Admin - @yield('title')</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">
    <div class="flex">
        {{-- Sidebar --}}
        <aside class="w-64 min-h-screen bg-gray-800 text-white p-4">
            <h1 class="text-xl font-bold mb-6">Admin Panel</h1>
            <nav class="flex flex-col gap-2">
                <a href="{{ route('admin.users.index') }}" class="hover:bg-gray-700 p-2 rounded">Quản lý User</a>
                <a href="{{ route('admin.collections.index') }}" class="hover:bg-gray-700 p-2 rounded">Quản lý
                    Collection</a>
            </nav>
        </aside>

        {{-- Nội dung chính --}}
        <main class="flex-1 p-8">
            @yield('content')
        </main>
    </div>
</body>

</html>