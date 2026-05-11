import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(_req: NextRequest) {
  // Auth middleware disabled — Clerk env vars not configured
  // When ready: uncomment clerkMiddleware integration below
  return NextResponse.next()
}

// TODO: Enable when Clerk is configured:
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// const isPublicRoute = createRouteMatcher(['/', '/blog(.*)', '/projects(.*)', '/faq', '/contact', '/sign-in(.*)', '/sign-up(.*)', '/checkout(.*)', '/api/newsletter', '/api/stripe/webhook', '/api/clerk/webhook'])
// export default clerkMiddleware(async (auth, req) => { if (!isPublicRoute(req)) await auth.protect() })

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
