import { getAuthState } from "@/lib/auth-server"
import LayoutWrapper from "./layout-wrapper"

interface LayoutOnlyWrapperProps {
	children: React.ReactNode
}

// Server component for pages that need layout switching but not auth protection
// Perfect for pages like /contact, /mission, etc.
export default async function LayoutOnlyWrapper({ children }: LayoutOnlyWrapperProps): Promise<JSX.Element> {
	const authState = await getAuthState()

	return (
		<LayoutWrapper initialAuthState={authState}>
			{children}
		</LayoutWrapper>
	)
}
