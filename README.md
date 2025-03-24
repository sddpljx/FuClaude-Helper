# FuClaude Helper

A Next.js application with Clerk authentication that automatically logs in to FuClaude API after successful authentication.

## Features

- Next.js 13 app router
- Clerk authentication
- Tailwind CSS for styling
- Automatic login to FuClaude API after Clerk authentication
- Responsive design with a split layout on the homepage

## Setup

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# FuClaude API
FUCLAUDE_API_TOKEN=your_fuclaude_api_token
FUCLAUDE_API_URL=https://api.fuclaude.com # Replace with the actual API URL
```

### Installation

1. Clone the repository or extract the project files
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment on Vercel

1. Push your code to a GitHub repository
2. Sign up/login to [Vercel](https://vercel.com)
3. Create a new project by importing your GitHub repository
4. Configure the environment variables in the Vercel project settings
5. Deploy the project

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/` - React components for the UI
- `app/api/fuclaude/login` - API route for automatic FuClaude login

## License

MIT 