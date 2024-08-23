import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import { appWindow } from '@tauri-apps/api/window'; // 导入 Tauri 的窗口 API
import { invoke } from '@tauri-apps/api';
import { message } from '@tauri-apps/api/dialog';

// const { appWindow } = window.__TAURI__.window;

const Login: React.FC = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 初始化 navigate


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        invoke('login', { account: account.trim(), password: password.trim() }).then(async (response) => {
            console.log(response);
            if (response == false) {
                await message('登录失败', { title: '丸 辣', type: 'error' });
            }
            else {
                await message('登录成功', { title: 'OK 辣', type: 'info' });
            }
        });
        if (false) {
            navigate('/chat');
        }
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

        // 组件卸载时清理事件监听器
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <h2>登录</h2>
                <input
                    type="text"
                    placeholder="账号"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '20px', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
                    开始使用
                </button>
            </form>
        </div>
    );
};

export default Login;
