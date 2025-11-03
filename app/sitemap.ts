import { MetadataRoute } from "next"

// Base URL for the site
// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_URL = "https://www.leverlabs.com"

// Current date for lastmod
const currentDate = new Date().toISOString().split("T")[0]

// Define route types with their priorities and change frequencies
type RouteConfig = {
	path: PageNames
	changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
	priority: number
}

// Main pages with higher priority
const mainRoutes: RouteConfig[] = [
	{ path: "/", changeFreq: "weekly", priority: 1.0 },
	{ path: "/sandbox", changeFreq: "monthly", priority: 1 },
	{ path: "/career-quest", changeFreq: "monthly", priority: 1 },
	{ path: "/whiteboard", changeFreq: "monthly", priority: 1 },
	{ path: "/scoreboard", changeFreq: "monthly", priority: 1 },
	{ path: "/class-manager", changeFreq: "monthly", priority: 1 },
	{ path: "/garage", changeFreq: "monthly", priority: 1 },
	{ path: "/settings/profile", changeFreq: "monthly", priority: 1 },
	{ path: "/settings/schools", changeFreq: "monthly", priority: 1 },
]

// Account and user pages
const userRoutes: RouteConfig[] = [
	{ path: "/login", changeFreq: "monthly", priority: 0.8 },
	{ path: "/register", changeFreq: "monthly", priority: 0.8 },
	{ path: "/register-google", changeFreq: "monthly", priority: 0.8 }
]

// Account and user pages
const miscRoutes: RouteConfig[] = [
	{ path: "/privacy", changeFreq: "monthly", priority: 0.8 },
	{ path: "/mission", changeFreq: "monthly", priority: 0.8 },
	{ path: "/terms", changeFreq: "monthly", priority: 0.8 },
	{ path: "/community-guidelines", changeFreq: "monthly", priority: 0.8 },
	{ path: "/contact", changeFreq: "monthly", priority: 0.8 }
]

// Helper function to convert routes to sitemap entries
function routesToSitemapEntries(routes: RouteConfig[]): MetadataRoute.Sitemap {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return routes.map(route => ({
		url: `${BASE_URL}${route.path}`,
		lastModified: currentDate,
		changeFrequency: route.changeFreq,
		priority: route.priority,
	}))
}

// Generate the sitemap
export default function sitemap(): MetadataRoute.Sitemap {
	const allRoutes = [
		...routesToSitemapEntries(mainRoutes),
		...routesToSitemapEntries(userRoutes),
		...routesToSitemapEntries(miscRoutes),
	]

	return allRoutes
}
