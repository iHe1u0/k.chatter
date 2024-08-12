import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

const Chat: React.FC = () => {
    const navigate = useNavigate(); // 初始化 navigate


    const disableRefresh = () => {
        document.addEventListener('keydown', function (event) {
            // Prevent F5 or Ctrl+R (Windows/Linux) and Command+R (Mac) from refreshing the page
            if (
                event.key === 'F5' ||
                event.key === 'F12' ||
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

        document.title = 'Chat Page'; // Set the page title here


    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <text>Hello World</text>
        </div>
    );
};

export default Chat;
