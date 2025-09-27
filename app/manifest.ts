import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Lever Labs",
		short_name: "Lever Labs",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "32x32 16x16",
				type: "image/x-icon"
			},
			{
				src: "/logo192.png",
				type: "image/png",
				sizes: "192x192"
			},
			{
				src: "/logo512.png",
				type: "image/png",
				sizes: "512x512",
				purpose: "any"
			},
			{
				src: "/android-chrome-192x192.png",
				type: "image/png",
				sizes: "192x192",
				purpose: "maskable"
			},
			{
				src: "/android-chrome-512x512.png",
				type: "image/png",
				sizes: "512x512",
				purpose: "maskable"
			},
			{
				src: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png"
			},
			{
				src: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png"
			},
			{
				src: "/favicon-48x48.png",
				sizes: "32x32",
				type: "image/png"
			},
			{
				src: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png"
			}
		],
		start_url: "/",
		display: "standalone",
		theme_color: "#003da5",
		background_color: "#e2e8f0"
	}
}
