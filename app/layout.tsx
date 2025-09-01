import { Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../src/styles/index.css"
import Providers from "./providers"
import { lexend } from "../src/utils/fonts"

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#003da5", // Blue Dot Robots brand color
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={`${lexend.variable}`}>
			<body>
				<Providers>
					{children}
				</Providers>
				{process.env.VERCEL_ENV === "production" && (
					<>
						<Analytics />
						<SpeedInsights />
					</>
				)}
			</body>
		</html>
	)
}
