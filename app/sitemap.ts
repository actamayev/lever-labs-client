// app/sitemap.ts
import { MetadataRoute } from "next"

// Base URL for the site
// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_URL = "https://www.bluedotrobots.com"

// Current date for lastmod
const currentDate = new Date().toISOString().split("T")[0]

// Define route types with their priorities and change frequencies
type RouteConfig = {
  path: string
  changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
}

// Main pages with higher priority
const mainRoutes: RouteConfig[] = [
	{ path: "", changeFreq: "weekly", priority: 1.0 },
	{ path: "/lab", changeFreq: "weekly", priority: 1.0 },
	{ path: "/sandbox", changeFreq: "monthly", priority: 1 },
	{ path: "/career-quest", changeFreq: "monthly", priority: 1 },
	{ path: "/garage", changeFreq: "monthly", priority: 1 },
	{ path: "/profile", changeFreq: "monthly", priority: 1 },
]

// Account and user pages
const userRoutes: RouteConfig[] = [
	{ path: "/login", changeFreq: "monthly", priority: 0.8 },
	{ path: "/register", changeFreq: "monthly", priority: 0.8 },
	{ path: "/register-username", changeFreq: "monthly", priority: 0.8 },
	{ path: "/add-pip", changeFreq: "monthly", priority: 0.8 },
	{ path: "/settings", changeFreq: "monthly", priority: 0.8 },
	{ path: "/contact", changeFreq: "monthly", priority: 0.8 },
]

// Lab pages
const labRoutes: RouteConfig[] = [
	{ path: "/lab/welcome", changeFreq: "monthly", priority: 0.8 },
]

// LED-specific pages - reading
const ledReadingRoutes: RouteConfig[] = [
	{ path: "/lab/led/reading/intro-to-leds", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/reading/voltage", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/reading/rgb-leds", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/reading/intro-to-code", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/reading/leds-and-loops", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/reading/led-advantages", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/reading/leds-in-robotics", changeFreq: "monthly", priority: 0.8 },
]

// LED-specific pages - demo
const ledDemoRoutes: RouteConfig[] = [
	{ path: "/lab/led/demo/led-light-show", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/first-light", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/color-mixing", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/blue-leds", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/check-button-press", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/simple-led-control", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/multi-button-led-control", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/led-counting-loop", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/demo/led-breathing", changeFreq: "monthly", priority: 0.8 },
]

// LED-specific pages - code and summary
const ledCodeRoutes: RouteConfig[] = [
	{ path: "/lab/led/code/led-control", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/code/breathing-leds", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/code/warehouse-pip", changeFreq: "monthly", priority: 0.8 },
	{ path: "/lab/led/summary", changeFreq: "monthly", priority: 0.8 },
]

// Helper function to convert routes to sitemap entries
function routesToSitemapEntries(routes: RouteConfig[]): MetadataRoute.Sitemap {
	return routes.map(route => ({
		url: `${BASE_URL}${route.path}`,
		lastModified: currentDate,
		changeFrequency: route.changeFreq,
		priority: route.priority,
	}))
}

// Generate the sitemap
export default function sitemap(): MetadataRoute.Sitemap {
	// Combine all routes
	const allRoutes = [
		...routesToSitemapEntries(mainRoutes),
		...routesToSitemapEntries(userRoutes),
		...routesToSitemapEntries(labRoutes),
		...routesToSitemapEntries(ledReadingRoutes),
		...routesToSitemapEntries(ledDemoRoutes),
		...routesToSitemapEntries(ledCodeRoutes),
		// Add new route categories here as your site grows
	]

	return allRoutes
}
