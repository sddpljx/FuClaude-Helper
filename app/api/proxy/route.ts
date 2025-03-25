import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

if (!process.env.SKEYS || !process.env.CLAUDE_ORIGINAL_WEBSITE) {
  throw new Error("Missing required environment variables for Claude configuration");
}

const CONFIG = {
  ORIGINAL_WEBSITE: process.env.CLAUDE_ORIGINAL_WEBSITE,
  SESSION_KEYS: process.env.SKEYS.split(','),
};

// 添加CORS中间件
async function corsMiddleware(request: Request, response: Response | NextResponse) {
  const origin = request.headers.get('origin') || '';
  const headers = new Headers(response.headers);
  
  // 设置CORS头
  headers.set('Access-Control-Allow-Credentials', 'true');
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return corsMiddleware(request, new NextResponse("Unauthorized", { status: 401 }));
    }

    const url = new URL(request.url);
    const targetUrl = `${CONFIG.ORIGINAL_WEBSITE}${url.pathname}${url.search}`;

    // 创建新的headers对象
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${getRandomSessionKey()}`);
    
    // 添加必要的原始请求头
    const originalHeaders = new Headers(request.headers);
    ['content-type', 'user-agent'].forEach(header => {
      const value = originalHeaders.get(header);
      if (value) headers.set(header, value);
    });

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      credentials: 'include',
    });

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      let html = await response.text();
      const regex = /<div[^>]*>(?=[\s\S]*?<h3[\s\S]*?<\/h3>)(?=[\s\S]*?<p[\s\S]*?<\/p>)(?=[\s\S]*?<div[\s\S]*?<\/div>)[\s\S]*?<\/div>/gi;
      html = html.replace(regex, '');
      
      const htmlResponse = new NextResponse(html, {
        headers: { 'Content-Type': contentType }
      });
      
      return corsMiddleware(request, htmlResponse);
    }

    return corsMiddleware(request, response);
  } catch (error) {
    console.error('Proxy error:', error);
    return corsMiddleware(
      request,
      new NextResponse(
        `Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { status: 500 }
      )
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}

// 处理预检请求
export async function OPTIONS(request: Request) {
  return corsMiddleware(
    request,
    new NextResponse(null, { status: 204 })
  );
}

function getRandomSessionKey() {
  const keys = CONFIG.SESSION_KEYS;
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
} 