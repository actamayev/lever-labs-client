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
					"/register"
				],
				disallow: [
					"/garage/",
					"/lab/",
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
