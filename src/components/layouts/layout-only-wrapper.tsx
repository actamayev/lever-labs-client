import { getAuthState } from "@/lib/auth-server"
import LayoutWrapper from "./layout-wrapper"

interface LayoutOnlyWrapperProps {
	children: React.ReactNode
}

export default async function LayoutOnlyWrapper({ children }: LayoutOnlyWrapperProps): Promise<React.ReactElement> {
	const authState = await getAuthState()

	return (
		<LayoutWrapper initialAuthState={authState}>
			{children}
		</LayoutWrapper>
	)
}
