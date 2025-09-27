import { Metadata } from "next"
import { PrivatePageNames } from "../constants/page-constants"

// Define the base domain for your site
// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_URL = "https://www.leverlabs.com"

// Define common image paths
// const DEFAULT_OG_IMAGE = "/images/og-default.jpg"

// Fixed static keywords
// eslint-disable-next-line @typescript-eslint/naming-convention
const STATIC_KEYWORDS: [string, string, string] = [
	"robotics education",
	"lever labs",
	"stem learning"
]

// Types for the custom metadata function
type MetadataProps = {
	title: string
	description: string
	path: PageNames
	needsLeverLabsSuffix?: boolean
	keywords: [string, string, string] // Tuple type enforces exactly 3 strings
	noIndex?: boolean
};

/**
 * Creates consistent metadata across the site with customizable fields
 * Enforces exactly 3 custom keywords per page + 3 static keywords
 */
export function createMetadata({
	title,
	description,
	path,
	needsLeverLabsSuffix = true,
	keywords,
	noIndex,
}: MetadataProps): Metadata {
	// No need to validate count, TypeScript enforces exactly 3 keywords

	// Format title based on needsLeverLabsSuffix flag
	const formattedTitle = needsLeverLabsSuffix ? `${title} | Lever Labs` : title

	// Build the full URL
	const url = `${BASE_URL}${path}`

	// Twitter image defaults to OG image if not specified
	// const twitterImageUrl = twitterImage || ogImage

	// Combine custom keywords with static keywords
	const combinedKeywords = [...keywords, ...STATIC_KEYWORDS]

	const shouldNoIndex = noIndex ?? isProtectedPage(path)

	return {
		// Basic metadata
		title: formattedTitle,
		description,

		// Canonical URL
		alternates: {
			canonical: url,
		},

		// Open Graph metadata
		openGraph: {
			title: formattedTitle,
			description,
			url,
			siteName: "Lever Labs",
			locale: "en_US",
			type: "website",
			// images: [
			// 	{
			// 		url: `${BASE_URL}${ogImage}`,
			// 		width: 1200,
			// 		height: 630,
			// 		alt: `Lever Labs - ${title}`,
			// 	},
			// ],
		},

		// Twitter metadata
		twitter: {
			card: "summary_large_image",
			title: formattedTitle,
			description,
			creator: "@lever_labs",
			// images: [`${BASE_URL}${twitterImageUrl}`],
		},

		// Fixed keywords (3 custom + 3 static)
		keywords: combinedKeywords,

		// Other metadata
		authors: [{ name: "Lever Labs Team" }],
		publisher: "Lever Labs",

		// SEO settings
		robots: shouldNoIndex
			? { index: false, follow: false }
			: { index: true, follow: true }
	}
}

function isProtectedPage(path: PageNames): boolean {
	// Check if the path is in your PrivatePageNames array
	// Or use a more flexible approach checking for prefixes
	return PrivatePageNames.includes(path) ||
		path.startsWith("/garage/") ||
		path.startsWith("/sandbox/") ||
		path.startsWith("/settings/") ||
		path.startsWith("/career-quest/") ||
		path.startsWith("/class-manager/") ||
		path.startsWith("/whiteboard/") ||
		path.startsWith("/scoreboard/")
}
