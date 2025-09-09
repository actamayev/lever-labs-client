import { getAuthState } from "@/lib/auth-server"
import AuthenticatedLayoutClient from "./authenticated-layout-client"
import LayoutWrapper from "./layout-wrapper"

interface AuthenticatedLayoutProps {
	children: React.ReactNode
}

// Server component that gets auth state and handles both layout decision AND auth logic
export default async function AuthenticatedLayout({ children }: AuthenticatedLayoutProps): Promise<JSX.Element> {
	const authState = await getAuthState()

	return (
		<LayoutWrapper initialAuthState={authState}>
			<AuthenticatedLayoutClient authState={authState}>
				{children}
			</AuthenticatedLayoutClient>
		</LayoutWrapper>
	)
}
