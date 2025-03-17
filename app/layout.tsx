import { Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "../src/styles/index.css"
import Providers from "./providers"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
		<html lang="en">
			<body>
				<Providers>
					{children}
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
