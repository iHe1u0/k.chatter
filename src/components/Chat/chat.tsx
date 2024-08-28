import React, { useEffect, useRef, useState } from 'react';
import './chat.css'; // 导入 CSS 文件

import { invoke } from '@tauri-apps/api/tauri';


const Chat: React.FC = () => {
    const generateDefaultMessages = (count: number) =>
        Array.from({ length: count }, (_, index) => ({
            text: `Message ${index + 1}`,
            sender: index % 2 === 0 ? 'me' : 'other'
        }));

    const defaultMessages = generateDefaultMessages(10);

    const [messages, setMessages] = useState(defaultMessages);
    const [input, setInput] = useState('');
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'me' }]);
            invoke('post_msg', { msg: input }).then((response) => {
                console.log(response);
            });
            setInput('');
        }
    };

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const disableRefresh = () => {
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                handleSend();
            } else if (
                event.key === 'F5' ||
                event.key === 'F12' ||
                event.altKey ||
                (event.ctrlKey && event.key === 'R')
            ) {
                event.preventDefault();
            }
        });

        document.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
    };

    useEffect(() => {
        disableRefresh();
        document.title = 'Chat Page';
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <img
                            src={msg.sender === 'me' ? 'https://q2.qlogo.cn/headimg_dl?dst_uin=1310393537&spec=100' : 'https://cdn.oaistatic.com/_next/static/media/favicon-32x32.630a2b99.png'}
                            alt={msg.sender}
                        />
                        <div className="message-content">
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {input.trim() && (
                    <button
                        onClick={handleSend}
                    >
                        发送
                    </button>
                )}
            </div>
        </div>
    );
};

export default Chat;
