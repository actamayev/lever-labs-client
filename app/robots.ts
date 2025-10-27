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
					"/login",
					"/register",
					"/privacy",
					"/community-guidelines",
					"/terms"
				],
				disallow: [
					"/garage/",
					"/sandbox/",
					"/settings/",
					"/career-quest/",
					"/class-manager/",
					"/whiteboard/",
					"/scoreboard/",
				]
			}
		],
		sitemap: "https://www.leverlabs.com/sitemap.xml",
	}
}
