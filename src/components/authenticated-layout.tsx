import { getAuthState } from "@/lib/auth-server"
import AuthenticatedLayoutClient from "./authenticated-layout-client"

interface AuthenticatedLayoutProps {
	children: React.ReactNode
}

// Server component that gets auth state and passes to client (now async)
export default async function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
	const authState = await getAuthState() // ✅ Now awaiting the async function

	return (
		<AuthenticatedLayoutClient authState={authState}>
			{children}
		</AuthenticatedLayoutClient>
	)
}
