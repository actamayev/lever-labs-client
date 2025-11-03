/* eslint-disable @typescript-eslint/naming-convention */
import { Metadata } from "next"
import { PrivatePageNames } from "../constants/page-constants"

const BASE_URL = "https://www.leverlabs.com"

const DEFAULT_OG_IMAGE = "/og-default.jpg"

// Static keywords that appear on every page
const STATIC_KEYWORDS = [
	"robotics education",
	"lever labs",
	"stem learning"
] as const

type MetadataProps = {
	title: string
	description: string
	path: PageNames
	needsLeverLabsSuffix?: boolean
	keywords: string[] // Now accepts any number of keywords
	noIndex?: boolean
	structuredData?: Record<string, unknown> // For JSON-LD
};

/**
 * Creates consistent metadata across the site with customizable fields
 * Accepts flexible keyword arrays and includes structured data support
 */
export function createMetadata({
	title,
	description,
	path,
	needsLeverLabsSuffix = true,
	keywords,
	noIndex,
	structuredData,
}: MetadataProps): Metadata {
	// Format title based on needsLeverLabsSuffix flag
	const formattedTitle = needsLeverLabsSuffix ? `${title} | Lever Labs` : title

	// Build the full URL
	const url = `${BASE_URL}${path}`

	// Combine custom keywords with static keywords
	const combinedKeywords = [...keywords, ...STATIC_KEYWORDS]

	// Determine if page should be indexed
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
			images: [
				{
					url: `${BASE_URL}${DEFAULT_OG_IMAGE}`,
					width: 1200,
					height: 630,
					alt: `Lever Labs - ${title}`,
					type: "image/jpeg", // Add this
				},
			],
		},

		// Twitter metadata
		twitter: {
			card: "summary_large_image",
			title: formattedTitle,
			description,
			creator: "@lever_labs",
			images: [`${BASE_URL}${DEFAULT_OG_IMAGE}`],
		},

		// Keywords (flexible array)
		keywords: combinedKeywords,

		// Other metadata
		authors: [{ name: "Lever Labs Team" }],
		publisher: "Lever Labs",

		// SEO settings
		robots: shouldNoIndex
			? {
				index: false,
				follow: false,
				nocache: true, // Prevent caching of protected pages
			}
			: {
				index: true,
				follow: true,
				"max-image-preview": "large", // Allow large preview images
				"max-snippet": -1, // No limit on snippet length
				"max-video-preview": -1, // No limit on video preview
			},

		// Additional metadata
		other: {
			"og:site_name": "Lever Labs",
			...(structuredData && {
				"application/ld+json": JSON.stringify(structuredData)
			})
		}
	}
}

function isProtectedPage(path: PageNames): boolean {
	return PrivatePageNames.includes(path) ||
		path.startsWith("/garage/") ||
		path.startsWith("/sandbox/") ||
		path.startsWith("/settings/") ||
		path.startsWith("/career-quest/") ||
		path.startsWith("/class-manager/") ||
		path.startsWith("/whiteboard/") ||
		path.startsWith("/scoreboard/") ||
		path.startsWith("/login") ||
		path.startsWith("/register")
}
