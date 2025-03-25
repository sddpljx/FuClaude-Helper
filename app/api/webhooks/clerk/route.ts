import { Webhook } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const payload = await req.json();
  const headerPayload = req.headers;
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  try {
    const evt = Webhook.verify(
      JSON.stringify(payload),
      {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      },
      process.env.CLERK_WEBHOOK_SECRET
    );

    // 处理 webhook 事件
    const eventType = evt.type;
    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name } = evt.data;
      // 在这里处理用户创建事件
      console.log('User created:', { id, email_addresses, first_name, last_name });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
} 