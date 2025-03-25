// app/robots.ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: [
					"/",
					"/schools",
					"/mission",
					"/contact"
				],
				disallow: "/*", // Disallow all other routes
			}
		],
		sitemap: "https://www.bluedotrobots.com/sitemap.xml",
	}
}
