import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // 从查询参数中获取重定向URL
  const redirectUrl = searchParams.get('redirect_url') || '/';
  
  // 重定向到指定的URL
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

export async function POST(request: Request) {
  try {
    // 简单返回成功响应，真正的身份验证由Clerk处理
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 400 });
  }
} 