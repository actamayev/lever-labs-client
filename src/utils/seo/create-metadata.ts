/* eslint-disable @typescript-eslint/naming-convention */
import { Metadata } from "next"
import { PrivatePageNames } from "../constants/page-constants"

const BASE_URL = "https://leverlabs.com"

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
	keywords: string[]
	noIndex?: boolean
	structuredData?: Record<string, unknown>
}

export function createMetadata({
	title,
	description,
	path,
	needsLeverLabsSuffix = true,
	keywords,
	noIndex,
	structuredData,
}: MetadataProps): Metadata {
	const formattedTitle = needsLeverLabsSuffix ? `${title} | Lever Labs` : title
	const url = `${BASE_URL}${path}`
	const combinedKeywords = [...keywords, ...STATIC_KEYWORDS]
	const shouldNoIndex = noIndex ?? isProtectedPage(path)

	return {
		metadataBase: new URL("https://leverlabs.com"),
		// Add title template support
		title: {
			default: formattedTitle,
			template: needsLeverLabsSuffix ? "%s | Lever Labs" : "%s"
		},
		description,

		// Use relative URLs - metadataBase will resolve them
		alternates: {
			canonical: path,
		},

		openGraph: {
			title: formattedTitle,
			description,
			url,
			siteName: "Lever Labs",
			locale: "en_US",
			type: "website",
			images: [
				{
					url: DEFAULT_OG_IMAGE, // Relative URL
					width: 1200,
					height: 630,
					alt: `Lever Labs - ${title}`,
					type: "image/jpeg",
				},
			],
		},

		twitter: {
			card: "summary_large_image",
			title: formattedTitle,
			description,
			creator: "@lever_labs",
			images: [DEFAULT_OG_IMAGE], // Relative URL
		},

		keywords: combinedKeywords,
		authors: [{ name: "Lever Labs Team" }],
		creator: "Lever Labs", // Add this
		publisher: "Lever Labs",

		// Add icons configuration
		icons: {
			icon: "/favicon.ico",
			apple: "/apple-touch-icon.png",
		},

		// Add manifest
		manifest: "/manifest.webmanifest",

		robots: shouldNoIndex
			? {
				index: false,
				follow: false,
				nocache: true,
			}
			: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},

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
