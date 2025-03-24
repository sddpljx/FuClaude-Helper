import Head from 'next/head';
import { useAuth, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useAuth();

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
        
        <SignedIn>
          <p className="description">
            您已登录，即将跳转到 Claude 助手页面...
          </p>
          <meta httpEquiv="refresh" content={`2;url=${process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}`} />
        </SignedIn>
        
        <SignedOut>
          <p className="description">
            请登录后继续使用 Claude 助手
          </p>
          <SignInButton mode="modal">
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
              登录
            </button>
          </SignInButton>
        </SignedOut>
      </main>
    </div>
  );
} 