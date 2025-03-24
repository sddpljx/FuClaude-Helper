import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function Dashboard() {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded || !userId) return;

    // Redirect to the original website once authenticated
    const originalWebsite = process.env.NEXT_PUBLIC_ORIGINAL_WEBSITE || 'https://sddpljx-fuclaude.hf.space';
    window.location.href = originalWebsite;
  }, [isLoaded, userId]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <main className="card">
        <img
          src="https://github.com/sddpljx/icon/blob/main/claude-color.png?raw=true"
          alt="Claude Logo"
          className="logo"
        />
        <h1 className="title">Claude 助手</h1>
        <p className="description">登录成功，正在跳转到 Claude 服务页面...</p>
        <div
          style={{
            width: '50px',
            height: '50px',
            border: '5px solid rgba(0, 0, 0, 0.1)',
            borderTopColor: '#2c2c2c',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </main>
    </div>
  );
} 