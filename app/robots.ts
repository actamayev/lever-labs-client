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
					"/contact",
					"/login",
					"/register",
					"/privacy",
					"/community-guidelines",
					"/terms"
				],
				disallow: [
					"/garage/",
					"/add-pip/",
					"/sandbox/",
					"/profile/",
					"/career-quest/"
				]
			}
		],
		sitemap: "https://www.bluedotrobots.com/sitemap.xml",
	}
}
