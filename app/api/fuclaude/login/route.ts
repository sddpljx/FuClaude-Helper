import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export async function POST() {
  try {
    // Get the current authenticated user from Clerk
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized: Not authenticated with Clerk' },
        { status: 401 }
      );
    }

    // Get FuClaude API credentials from environment variables
    const apiToken = process.env.FUCLAUDE_API_TOKEN;
    const apiUrl = process.env.FUCLAUDE_API_URL;

    if (!apiToken || !apiUrl) {
      return NextResponse.json(
        { message: 'Server Error: FuClaude API credentials not configured' },
        { status: 500 }
      );
    }

    // Make a request to FuClaude API to authenticate
    const fuClaudeResponse = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      }
    });

    if (!fuClaudeResponse.ok) {
      const errorData = await fuClaudeResponse.json().catch(() => ({}));
      return NextResponse.json(
        { 
          message: 'Failed to authenticate with FuClaude API',
          error: errorData 
        },
        { status: fuClaudeResponse.status }
      );
    }

    // Successfully authenticated with FuClaude
    const fuClaudeData = await fuClaudeResponse.json();

    return NextResponse.json({
      message: 'Successfully authenticated with FuClaude',
      data: fuClaudeData
    });
  } catch (error) {
    console.error('Error in FuClaude login:', error);
    
    return NextResponse.json(
      { 
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 