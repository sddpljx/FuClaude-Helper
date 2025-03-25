'use client';

import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <button
            className={`w-1/2 py-2 ${activeTab === "signIn" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("signIn")}
          >
            登录
          </button>
          <button
            className={`w-1/2 py-2 ${activeTab === "signUp" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("signUp")}
          >
            注册
          </button>
        </div>

        {activeTab === "signIn" ? (
          <SignIn routing="path" path="/sign-in" />
        ) : (
          <SignUp routing="path" path="/sign-up" />
        )}
      </div>
    </main>
  );
} 