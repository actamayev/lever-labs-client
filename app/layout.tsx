import { Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../src/styles/globals.css"
import Providers from "./providers"
import { lexend } from "../src/utils/fonts"
import { getAuthState } from "@/lib/auth-server"

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#003da5",
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}): Promise<React.ReactNode> {
	// Get theme from server to prevent flash
	const authState = await getAuthState()
	const isDark = authState.theme === "dark"

	return (
		<html
			lang="en"
			className={`${lexend.variable} ${isDark ? "dark" : ""}`}
			suppressHydrationWarning
		>
			<body className="overscroll-none antialiased">
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
