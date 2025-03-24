import Head from 'next/head';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';

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
        
        <SignedIn>
          <p className="description">
            您已登录，即将跳转到 Claude 助手页面...
          </p>
          <meta httpEquiv="refresh" content="2;url=/dashboard" />
        </SignedIn>
        
        <SignedOut>
          <p className="description">
            请登录后继续使用 Claude 助手
          </p>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
        </SignedOut>
      </main>
    </div>
  );
} 