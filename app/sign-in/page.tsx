'use client';

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <SignIn 
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl={redirectUrl}
          afterSignInUrl="/"
          afterSignUpUrl="/"
        />
      </div>
    </main>
  );
} 