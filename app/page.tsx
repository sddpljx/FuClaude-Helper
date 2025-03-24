import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { FuClaudeLogin } from '@/components/FuClaudeLogin';

export default async function Home() {
  const user = await currentUser();
  
  // If user is logged in, show the FuClaude login component
  if (user) {
    return <FuClaudeLogin />;
  }

  return (
    <main className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden md:flex w-1/2 bg-gray-50 justify-center items-center">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1655635949212-1d8f4958f0c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="AI assistant"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      
      {/* Right side - Authentication */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome to FuClaude Helper</h1>
          <SignIn 
            path="/"
            routing="path"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </main>
  );
} 