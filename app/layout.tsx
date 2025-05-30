import { Viewport } from "next"
import Script from "next/script"
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
				{process.env.NODE_ENV !== "development" && (
					<>
						<Analytics />
						<SpeedInsights />
						<Script
							src="https://app.rybbit.io/api/script.js"
							data-site-id="338"
							async
							data-track-query="false" // Enhances privacy by not tracking query parameters
							data-debounce="300" // Slightly faster response to navigation (default is 500ms)
						/>
					</>
				)}
			</body>
		</html>
	)
}
