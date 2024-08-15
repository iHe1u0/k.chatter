import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import { appWindow } from '@tauri-apps/api/window'; // 导入 Tauri 的窗口 API

// const { appWindow } = window.__TAURI__.window;

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 初始化 navigate

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里可以添加登录逻辑，例如 API 请求
        console.log('Logging in with', username, password);
        navigate('/chat'); // 根据你的需求替换 '/chat' 为目标路径
    };

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

        // 禁用页面滚动
        document.body.style.overflow = 'hidden';

        // 绑定最小化按钮的点击事件
        const minButton = document.getElementById('minimum-button');
        if (minButton) {
            minButton.addEventListener('click', () => {
                appWindow.minimize(); // 使用 Tauri API 最小化窗口
            });
        }

        // 绑定关闭按钮的点击事件
        const closeButton = document.getElementById('close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                appWindow.close(); // 使用 Tauri API 关闭窗口
            });
        }

        // 组件卸载时清理事件监听器
        return () => {
            if (minButton) {
                minButton.removeEventListener('click', () => {
                    appWindow.minimize();
                });
            }
            if (closeButton) {
                closeButton.removeEventListener('click', () => {
                    appWindow.close();
                });
            }
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div>
            <div id="titlebar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent', color: 'white', padding: '0 10px', height: '30px' }}>
                <span>登录</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button id="minimum-button" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginRight: '10px' }}>_</button>
                    <button id="close-button" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>x</button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: '10px', padding: '8px' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '20px', padding: '8px' }}
                    />
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
