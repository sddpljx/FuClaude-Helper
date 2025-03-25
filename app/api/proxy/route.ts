import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

if (!process.env.CLAUDE_SESSION_KEYS || !process.env.CLAUDE_ORIGINAL_WEBSITE) {
  throw new Error("Missing required environment variables for Claude configuration");
}

const CONFIG = {
  ORIGINAL_WEBSITE: process.env.CLAUDE_ORIGINAL_WEBSITE,
  SESSION_KEYS: process.env.SKEYS.split(','),
};

export async function GET(request: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const targetUrl = `${CONFIG.ORIGINAL_WEBSITE}${url.pathname}${url.search}`;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        'Authorization': `Bearer ${getRandomSessionKey()}`,
      },
    });

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      let html = await response.text();
      // Remove specific divs as in original code
      const regex = /<div[^>]*>(?=[\s\S]*?<h3[\s\S]*?<\/h3>)(?=[\s\S]*?<p[\s\S]*?<\/p>)(?=[\s\S]*?<div[\s\S]*?<\/div>)[\s\S]*?<\/div>/gi;
      html = html.replace(regex, '');
      return new NextResponse(html, {
        headers: {
          'Content-Type': contentType,
        },
      });
    }

    return response;
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request); // Handle POST requests the same way
}

function getRandomSessionKey() {
  const keys = CONFIG.SESSION_KEYS;
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
} 