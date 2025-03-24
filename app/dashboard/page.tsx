import { UserButton, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/');
  }
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold mb-2">Welcome, {user.firstName || user.username || 'User'}!</h2>
            <p>You have successfully logged in to FuClaude Helper.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">FuClaude Status</h2>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <p>Connected to FuClaude API</p>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            You can now use the FuClaude API with your account.
          </p>
        </div>
      </div>
    </main>
  );
} 