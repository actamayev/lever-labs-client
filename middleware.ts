/* eslint-disable @typescript-eslint/naming-convention */
import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"
import { PrivatePageNames } from "./src/utils/constants/page-constants"

interface JwtPayload {
	userId: number
	username: string | null
	isActive?: boolean
	iat?: number
	exp?: number
}

// Pages that should redirect to /garage if user is fully authenticated
const AUTH_PAGES = ["/login", "/register", "/register-google", "/"]

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const { pathname } = request.nextUrl

	try {
		// Get JWT from cookie
		const token = request.cookies.get("auth_token")?.value

		if (!token) {
			return handleUnauthenticated(request, pathname)
		}

		// Verify JWT using secure environment variable
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload }

		const isAuthenticated = true
		const hasCompletedSignup = Boolean(payload.username)
		const isActive = payload.isActive !== false // Default to true if not specified

		if (!isActive) {
			return handleUnauthenticated(request, pathname)
		}

		// Handle authenticated users
		return handleAuthenticated(request, pathname, {
			isAuthenticated,
			hasCompletedSignup,
			userId: payload.userId,
			username: payload.username
		})

	} catch (error) {
		// JWT verification failed
		console.error("JWT verification failed:", error)
		return handleUnauthenticated(request, pathname)
	}
}

// In middleware.ts - Updated handleUnauthenticated function
function handleUnauthenticated(_request: NextRequest, pathname: string): NextResponse {
	const response = NextResponse.next()

	// Add auth state headers for pages to read
	response.headers.set("x-auth-state", "unauthenticated")
	response.headers.set("x-user-id", "")
	response.headers.set("x-username", "")
	response.headers.set("x-has-completed-signup", "false")

	if (pathname === "/register-google") {
		return NextResponse.redirect(new URL("/", _request.url))
	}

	// Check page type explicitly
	const isPrivatePage = PrivatePageNames.some(page => pathname.startsWith(page))
	// const isOpenPage = OPEN_PAGES.some(page => pathname.startsWith(page))
	// const isAuthPage = AUTH_PAGES.includes(pathname)

	if (isPrivatePage) {
	// For ALL private pages, show auth component on same URL (no redirect)
		response.headers.set("x-show-auth-component", "true")
		return response
	}

	// For open pages and auth pages, just pass through normally
	// (isOpenPage || isAuthPage || other pages)
	return response
}

function handleAuthenticated(
	request: NextRequest,
	pathname: string,
	auth: { isAuthenticated: boolean, hasCompletedSignup: boolean, userId: number, username: string | null }
): NextResponse {
	// Check if user needs to complete signup (Google users without username)
	if (!auth.hasCompletedSignup) {
		// Redirect to register-google from ANY page (except register-google itself)
		if (pathname !== "/register-google") {
			return NextResponse.redirect(new URL("/register-google", request.url))
		}

		// Add auth state for register-google page
		const response = NextResponse.next()
		response.headers.set("x-auth-state", "authenticated-incomplete")
		response.headers.set("x-user-id", auth.userId.toString())
		response.headers.set("x-username", "")
		response.headers.set("x-has-completed-signup", "false")
		return response
	}

	// User is fully authenticated

	// Redirect from auth pages and landing page to /garage
	if (AUTH_PAGES.includes(pathname)) {
		return NextResponse.redirect(new URL("/garage", request.url))
	}

	// For all other pages, add auth state headers
	const response = NextResponse.next()
	response.headers.set("x-auth-state", "authenticated")
	response.headers.set("x-user-id", auth.userId.toString())
	response.headers.set("x-username", auth.username || "")
	response.headers.set("x-has-completed-signup", "true")

	return response
}

// Configure which paths the middleware should run on
export const config = {
	matcher: [
	/*
	* Match all request paths except for:
	* - api (API routes)
	* - _next/static (static files)
	* - _next/image (image optimization files)
	* - favicon.ico, favicon.svg (favicon files)  ← ADD THIS
	* - public folder assets (png, jpg, svg, etc.)  ← ADD THIS
	*/
		"/((?!api|_next/static|_next/image|favicon|.*\\.).*)",
	],
}
