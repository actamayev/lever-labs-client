import "../src/styles/index.css"
import Providers from "./providers"

export const metadata = {
	title: "Your App Name",
	description: "Your app description",
}

export default function RootLayout({
	children,
}: {
  children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>

					{children}
				</Providers>
			</body>
		</html>
	)
}
