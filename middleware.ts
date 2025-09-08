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

// JWT verification cache to reduce repeated verifications
const jwtCache = new Map<string, { payload: JwtPayload; exp: number }>()

// Clean expired cache entries periodically
setInterval((): void => {
	const now = Date.now() / 1000
	for (const [token, cached] of jwtCache.entries()) {
		if (cached.exp <= now) {
			jwtCache.delete(token)
		}
	}
}, 300000) // Clean every 5 minutes

// Pages that should redirect to /garage if user is fully authenticated
const AUTH_PAGES = ["/login", "/register", "/register-google", "/"]

// eslint-disable-next-line complexity
export async function middleware(request: NextRequest): Promise<NextResponse> {
	const { pathname } = request.nextUrl

	// Skip middleware entirely for public routes and auth pages
	if (pathname === "/" || pathname === "/login" || pathname === "/register" ||
		pathname.startsWith("/contact") || pathname.startsWith("/mission") ||
		pathname.startsWith("/schools") || pathname.startsWith("/terms") ||
		pathname.startsWith("/privacy") || pathname.startsWith("/community-guidelines")) {
		return NextResponse.next()
	}

	try {
		// Get JWT from cookie
		const token = request.cookies.get("auth_token")?.value

		if (!token) {
			return handleUnauthenticated(request, pathname)
		}

		// Check cache first to avoid repeated JWT verification
		const cached = jwtCache.get(token)
		if (cached && cached.exp > Date.now() / 1000) {
			const hasCompletedSignup = Boolean(cached.payload.username)
			const isActive = cached.payload.isActive !== false

			if (!isActive) {
				return handleUnauthenticated(request, pathname)
			}

			return handleAuthenticated(request, pathname, {
				hasCompletedSignup,
				userId: cached.payload.userId,
				username: cached.payload.username
			})
		}

		// Verify JWT using secure environment variable
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload }

		// Cache the verified payload
		jwtCache.set(token, { payload, exp: payload.exp || (Date.now() / 1000 + 3600) })

		const hasCompletedSignup = Boolean(payload.username)
		const isActive = payload.isActive !== false // Default to true if not specified

		if (!isActive) {
			return handleUnauthenticated(request, pathname)
		}

		// Handle authenticated users
		return handleAuthenticated(request, pathname, {
			hasCompletedSignup,
			userId: payload.userId,
			username: payload.username
		})

	} catch (error) {
		// JWT verification failed - remove from cache if exists
		const token = request.cookies.get("auth_token")?.value
		if (token) {
			jwtCache.delete(token)
		}
		console.error("JWT verification failed:", error)
		return handleUnauthenticated(request, pathname)
	}
}

// In middleware.ts - Updated handleUnauthenticated function
function handleUnauthenticated(_request: NextRequest, pathname: string): NextResponse {
	const response = NextResponse.next()

	// Add consolidated auth state header for pages to read
	const authData = {
		state: "unauthenticated",
		userId: null,
		username: "",
		hasCompletedSignup: false
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	if (pathname === "/register-google") {
		return NextResponse.redirect(new URL("/", _request.url))
	}

	// Check page type explicitly
	const isPrivatePage = PrivatePageNames.some((page): boolean => pathname.startsWith(page))
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
	auth: { hasCompletedSignup: boolean, userId: number, username: string | null }
): NextResponse {
	// Check if user needs to complete signup (Google users without username)
	if (!auth.hasCompletedSignup) {
		// Redirect to register-google from ANY page (except register-google itself)
		if (pathname !== "/register-google") {
			return NextResponse.redirect(new URL("/register-google", request.url))
		}

		// Add auth state for register-google page
		const response = NextResponse.next()
		const authData = {
			state: "authenticated-incomplete",
			userId: auth.userId,
			username: "",
			hasCompletedSignup: false
		}
		response.headers.set("x-auth-data", JSON.stringify(authData))
		return response
	}

	// User is fully authenticated

	// Redirect from auth pages and landing page to /garage
	if (AUTH_PAGES.includes(pathname)) {
		return NextResponse.redirect(new URL("/garage", request.url))
	}

	// For all other pages, add consolidated auth state header
	const response = NextResponse.next()
	const authData = {
		state: "authenticated",
		userId: auth.userId,
		username: auth.username || "",
		hasCompletedSignup: true
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	return response
}

// Configure which paths the middleware should run on
export const config = {
	matcher: [
		// Only run middleware on protected routes that actually need authentication
		"/garage/:path*",
		"/add-pip/:path*",
		"/sandbox/:path*",
		"/settings/:path*",
		"/career-quest/:path*",
		"/class-manager/:path*",
		"/whiteboard/:path*",
		"/register-google"
	],
}
