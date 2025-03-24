import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="container">
      <div className="card">
        <img 
          src="https://github.com/sddpljx/icon/blob/main/claude-color.png?raw=true" 
          alt="Claude Logo" 
          className="logo" 
        />
        <h1 className="title">Claude 助手</h1>
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
      </div>
    </div>
  );
} 