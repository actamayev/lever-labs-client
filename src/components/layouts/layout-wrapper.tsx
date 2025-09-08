"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { observer } from "mobx-react"
import PublicOnlyPage from "./classic-layout"
import InternalPagesLayout from "./internal-pages-layout"
import authClass from "../../classes/auth-class"
import { PrivatePageNames, OpenPages } from "../../utils/constants/page-constants"
import { AuthState } from "@/lib/auth-server"

interface LayoutWrapperProps {
	children: React.ReactNode
	initialAuthState: AuthState
}

function LayoutWrapper({ children, initialAuthState }: LayoutWrapperProps): React.ReactNode {
	const pathname = usePathname()
	const [isClientReady, setIsClientReady] = useState(false)

	// Sync server auth state with client on mount
	useEffect((): void => {
		// Only update from server state if client doesn't have auth state yet
		if (!authClass.isLoggedIn && initialAuthState.isAuthenticated) {
			authClass.setAuthState({
				isAuthenticated: initialAuthState.isAuthenticated,
				hasCompletedSignup: initialAuthState.hasCompletedSignup
			})
		}
		setIsClientReady(true)
	}, [initialAuthState])

	const isPrivatePage = PrivatePageNames.some((path): boolean => pathname.startsWith(path))
	const isOpenPage = OpenPages.some((path): boolean => pathname.startsWith(path))

	// Use client auth state (for seamless switching) or fall back to server state
	const isAuthenticated = isClientReady ? authClass.isLoggedIn : initialAuthState.isAuthenticated

	// Determine if we should show internal layout
	const shouldShowInternalLayout = isAuthenticated && (isPrivatePage || isOpenPage)

	if (shouldShowInternalLayout) {
		return <InternalPagesLayout>{children}</InternalPagesLayout>
	}

	return <PublicOnlyPage>{children}</PublicOnlyPage>
}

export default observer(LayoutWrapper)
