import Head from 'next/head';
import { SignInButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Claude 助手</title>
        <meta name="description" content="Claude 助手登录页面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="card">
        <img 
          src="https://github.com/sddpljx/icon/blob/main/claude-color.png?raw=true" 
          alt="Claude Logo" 
          className="logo" 
        />
        <h1 className="title">Claude 助手</h1>
        
        <p className="description">
          请登录后继续使用 Claude 助手
        </p>
        
        <div style={{ marginTop: '20px' }}>
          <SignInButton mode="modal" afterSignInUrl="/dashboard">
            <button
              style={{ 
                padding: '12px 24px',
                backgroundColor: '#2c2c2c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              使用Clerk登录
            </button>
          </SignInButton>
        </div>
      </main>
    </div>
  );
} 