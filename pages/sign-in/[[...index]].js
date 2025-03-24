import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignInPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Simple redirect to dashboard after delay
    const timer = setTimeout(() => {
      router.push('/logged-in');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <div className="container">
      <div className="card">
        <img 
          src="https://github.com/sddpljx/icon/blob/main/claude-color.png?raw=true" 
          alt="Claude Logo" 
          className="logo" 
        />
        <h1 className="title">Claude 助手</h1>
        <p className="description">登录成功，正在跳转...</p>
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
      </div>
    </div>
  );
} 