import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs';
import { WebhookEvent } from '@clerk/nextjs/server';

// 简化的 webhook 处理路由
export async function POST(req: Request) {
  // 获取请求头和请求体
  const headersList = headers();
  const payload = await req.text();
  
  // 获取 webhook 签名相关的头信息
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");
  
  // 验证必要的头信息是否存在
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing required Svix headers");
    return new Response('Missing svix headers', { status: 400 });
  }
  
  try {
    // 将请求主体解析为 JSON
    const bodyJson = JSON.parse(payload);
    const evt = bodyJson as WebhookEvent;
    
    // 处理不同类型的 webhook 事件
    switch (evt.type) {
      case 'user.created':
        console.log(`用户创建: ${evt.data.id}`);
        // 在这里添加您的自定义业务逻辑
        break;
        
      case 'user.updated':
        console.log(`用户更新: ${evt.data.id}`);
        // 在这里添加您的自定义业务逻辑
        break;
        
      case 'session.created':
        console.log(`会话创建: ${evt.data.id}`);
        // 在这里添加您的自定义业务逻辑
        break;
      
      default:
        console.log(`未处理的事件类型: ${evt.type}`);
    }
    
    // 返回成功响应
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook 处理错误:', error);
    return new Response('Webhook 处理错误', { status: 400 });
  }
} 