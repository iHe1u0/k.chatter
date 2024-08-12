import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

const Chat: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 初始化 navigate


    const disableRefresh = () => {
        document.addEventListener('keydown', function (event) {
            // Prevent F5 or Ctrl+R (Windows/Linux) and Command+R (Mac) from refreshing the page
            if (
                event.key === 'F5' ||
                (event.ctrlKey && event.key === 'r') ||
                (event.metaKey && event.key === 'r')
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

        // 禁用页面滚动
        document.body.style.overflow = 'hidden';

        // 组件卸载时恢复滚动
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <text>Hello World</text>
        </div>
    );
};

export default Chat;
