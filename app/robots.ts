import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: [
					"/",
					"/mission",
					"/contact",
					"/privacy",
					"/community-guidelines",
					"/terms"
				],
				disallow: [
					"/garage/",
					"/sandbox/",
					"/settings/profile/",
					"/settings/schools/",
					"/career-quest/",
					"/class-manager/",
					"/whiteboard/",
					"/scoreboard/",
					"/learn/",
					"/login",             // Utility pages
					"/register",
					"/register-google"
				]
			}
		],
		sitemap: "https://www.leverlabs.com/sitemap.xml",
	}
}
