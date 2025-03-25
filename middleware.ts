import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // 允许在未认证的情况下访问这些路径
  publicRoutes: [
    "/api/auth", 
    "/sign-in",
    "/sign-up",
    "/api/webhooks/clerk",
    "/"
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 