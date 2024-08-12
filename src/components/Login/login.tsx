import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 初始化 navigate

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里可以添加登录逻辑，例如 API 请求
        console.log('Logging in with', username, password);
        navigate('/chat'); // 根据你的需求替换 '/dashboard' 为目标路径

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

        // 组件卸载时恢复滚动
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
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
    );
};

export default Login;
