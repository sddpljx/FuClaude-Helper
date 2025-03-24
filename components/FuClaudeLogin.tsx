'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface FuClaudeAuthStatus {
  isAuthenticated: boolean;
  message: string;
  loading: boolean;
  error: string | null;
}

export function FuClaudeLogin() {
  const { user } = useUser();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<FuClaudeAuthStatus>({
    isAuthenticated: false,
    message: 'Initializing...',
    loading: true,
    error: null
  });

  useEffect(() => {
    const loginToFuClaude = async () => {
      if (!user) {
        setAuthStatus({
          isAuthenticated: false,
          message: 'User not authenticated with Clerk',
          loading: false,
          error: 'User not authenticated'
        });
        return;
      }

      try {
        setAuthStatus(prev => ({
          ...prev,
          message: 'Logging in to FuClaude...',
          loading: true
        }));

        // Call the API route that handles FuClaude login
        const response = await fetch('/api/fuclaude/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to authenticate with FuClaude');
        }

        const data = await response.json();
        
        setAuthStatus({
          isAuthenticated: true,
          message: 'Successfully logged in to FuClaude!',
          loading: false,
          error: null
        });

        // Redirect to dashboard after successful login
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (error) {
        setAuthStatus({
          isAuthenticated: false,
          message: 'Failed to log in to FuClaude',
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    loginToFuClaude();
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">FuClaude Authentication</h1>
        
        {authStatus.loading ? (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
            <p>{authStatus.message}</p>
          </div>
        ) : authStatus.isAuthenticated ? (
          <div className="text-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-medium">{authStatus.message}</p>
            <p className="mt-2 text-sm text-gray-600">Redirecting to dashboard...</p>
          </div>
        ) : (
          <div className="text-center text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-lg font-medium">{authStatus.message}</p>
            {authStatus.error && (
              <p className="mt-2 text-sm">{authStatus.error}</p>
            )}
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 