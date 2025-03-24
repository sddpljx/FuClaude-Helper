import Head from 'next/head';

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
          <a 
            href="/sign-in" 
            style={{ 
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#2c2c2c',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            点击登录
          </a>
        </div>
      </main>
    </div>
  );
} 