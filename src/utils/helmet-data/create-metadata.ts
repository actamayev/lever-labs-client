// lib/metadata.ts
import { Metadata } from "next"

// Define the base domain for your site
// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_URL = "https://www.bluedotrobots.com"

// Define common image paths
// const DEFAULT_OG_IMAGE = "/images/og-default.jpg"

// Fixed static keywords
// eslint-disable-next-line @typescript-eslint/naming-convention
const STATIC_KEYWORDS: [string, string, string] = [
	"robotics education",
	"blue dot robots",
	"stem learning"
]

// Types for the custom metadata function
type MetadataProps = {
  title: string
  description: string
  path: PageNames
  needsBlueDotSuffix?: boolean
//   ogImage?: string;
//   twitterImage?: string;
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
	needsBlueDotSuffix = true,
	// ogImage = DEFAULT_OG_IMAGE,
	// twitterImage,
	keywords,
	noIndex = false,
}: MetadataProps): Metadata {
	// No need to validate count, TypeScript enforces exactly 3 keywords

	// Format title based on needsBlueDotSuffix flag
	const formattedTitle = needsBlueDotSuffix ? `${title} | Blue Dot Robots` : title

	// Build the full URL
	const url = `${BASE_URL}${path}`

	// Twitter image defaults to OG image if not specified
	// const twitterImageUrl = twitterImage || ogImage

	// Combine custom keywords with static keywords
	const combinedKeywords = [...keywords, ...STATIC_KEYWORDS]

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
			siteName: "Blue Dot Robots",
			locale: "en_US",
			type: "website",
			// images: [
			// 	{
			// 		url: `${BASE_URL}${ogImage}`,
			// 		width: 1200,
			// 		height: 630,
			// 		alt: `Blue Dot Robots - ${title}`,
			// 	},
			// ],
		},

		// Twitter metadata
		twitter: {
			card: "summary_large_image",
			title: formattedTitle,
			description,
			creator: "@bluedotrobots",
			// images: [`${BASE_URL}${twitterImageUrl}`],
		},

		// Fixed keywords (3 custom + 3 static)
		keywords: combinedKeywords,

		// Other metadata
		authors: [{ name: "Blue Dot Robots Team" }],
		publisher: "Blue Dot Robots",

		// SEO settings
		robots: noIndex
			? { index: false, follow: false }
			: { index: true, follow: true }
	}
}
