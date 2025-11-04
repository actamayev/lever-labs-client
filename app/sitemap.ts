import { MetadataRoute } from "next"

// Base URL for the site
// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_URL = "https://leverlabs.com"

// Current date for lastmod
const currentDate = new Date().toISOString().split("T")[0]

// Define route types with their priorities and change frequencies
type RouteConfig = {
	path: PageNames
	changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
	priority: number
}

// ONLY include public, indexable pages in your sitemap
// DO NOT include pages that require login or are utility pages

// Main public pages
const publicRoutes: RouteConfig[] = [
	// Homepage - highest priority, changes most frequently
	{ path: "/", changeFreq: "weekly", priority: 1.0 },

	// Main marketing/content pages
	{ path: "/mission", changeFreq: "monthly", priority: 0.9 },
	{ path: "/contact", changeFreq: "monthly", priority: 0.8 },

	// Legal pages - lower priority, rarely change
	{ path: "/privacy", changeFreq: "yearly", priority: 0.5 },
	{ path: "/terms", changeFreq: "yearly", priority: 0.5 },
	{ path: "/community-guidelines", changeFreq: "yearly", priority: 0.5 },
]

// Helper function to convert routes to sitemap entries
function routesToSitemapEntries(routes: RouteConfig[]): MetadataRoute.Sitemap {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return routes.map((route: RouteConfig) => ({
		url: `${BASE_URL}${route.path}`,
		lastModified: currentDate,
		changeFrequency: route.changeFreq,
		priority: route.priority,
	}))
}

// Generate the sitemap
export default function sitemap(): MetadataRoute.Sitemap {
	return routesToSitemapEntries(publicRoutes)
}

// Note: The following pages are intentionally EXCLUDED from the sitemap:
// - /sandbox, /garage, /settings/* (require authentication)
// - /career-quest, /class-manager, /whiteboard, /scoreboard (protected pages)
// - /login, /register, /register-google (utility pages, not content)
