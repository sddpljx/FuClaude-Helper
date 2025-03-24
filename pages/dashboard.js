import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const redirectToOriginalWebsite = async () => {
      try {
        // Get the session key from environment
        const sessionKey = process.env.SESSION_KEY || 'sk-ant-sid01';
        
        // Build redirect URL to Claude original website
        const originalWebsite = process.env.ORIGINAL_WEBSITE || 'https://sddpljx-fuclaude.hf.space';
        
        // Prepare auth data
        const authData = {
          session_key: sessionKey,
          unique_name: user.username || user.firstName || user.id,
        };

        // Send auth request
        const response = await fetch(`${originalWebsite}/manage-api/auth/oauth_token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authData),
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate with the original website');
        }

        const data = await response.json();
        
        // Redirect to the login URL or the original website
        const loginUrl = data.login_url || '/';
        window.location.href = `${originalWebsite}${loginUrl}`;
      } catch (error) {
        console.error('Redirection error:', error);
        // Show error message to the user
        alert('Failed to connect to Claude service. Please try again later.');
      }
    };

    redirectToOriginalWebsite();
  }, [isLoaded, user]);

  return (
    <div className="container">
      <main className="card">
        <img
          src="https://github.com/sddpljx/icon/blob/main/claude-color.png?raw=true"
          alt="Claude Logo"
          className="logo"
        />
        <h1 className="title">Claude 助手</h1>
        <p className="description">正在连接到 Claude 服务，请稍候...</p>
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