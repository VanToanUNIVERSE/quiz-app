import { useEffect, useState } from 'react';
import echo from '../echo.js';   // ⚠️ đường dẫn tùy chỗ bạn đặt file — xem lưu ý dưới

function TestRealtime() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const channel = echo.channel('chat');
        channel.listen('MessageSent', (data) => {
            setMessages(prev => [...prev, data.message]);
        });

        return () => {
            echo.leave('chat');
        };
    }, []);

    return (
        <div>
            <h3>Tin nhắn real-time:</h3>
            {messages.map((msg, i) => <p key={i}>{msg}</p>)}
        </div>
    );
}

export default TestRealtime;   // ← THÊM dòng này (đoạn tôi đưa thiếu)