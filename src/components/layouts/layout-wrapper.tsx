// src/components/layouts/layout-wrapper.tsx
"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import { AuthState } from "@/lib/auth-server"
import { usePathname } from "next/navigation"
import PublicOnlyPage from "./classic-layout"
import getAuthClass from "../../classes/auth-class"
import ThemeProvider from "../theme/theme-provider"
import InternalPagesLayout from "./internal-pages-layout"
import getPersonalInfoClass from "../../classes/personal-info-class"
import { PrivatePageNames, OpenPages } from "../../utils/constants/page-constants"

interface LayoutWrapperProps {
	children: React.ReactNode
	initialAuthState: AuthState
}

function LayoutWrapper({ children, initialAuthState }: LayoutWrapperProps): React.ReactNode {
	const pathname = usePathname()

	// Sync server auth state and theme with client on mount
	useEffect((): void => {
		// Sync auth state
		if (!getAuthClass().isLoggedIn && initialAuthState.isAuthenticated) {
			getAuthClass().setAuthState({
				isAuthenticated: initialAuthState.isAuthenticated,
				hasCompletedSignup: initialAuthState.hasCompletedSignup
			})
		}

		// Sync theme from server
		getPersonalInfoClass().setDefaultSiteTheme(initialAuthState.theme, false)
	}, [initialAuthState])

	const isPrivatePage = PrivatePageNames.some((path): boolean => pathname.startsWith(path))
	const isOpenPage = OpenPages.some((path): boolean => pathname.startsWith(path))
	const isAuthenticated = getAuthClass().isLoggedIn || initialAuthState.isAuthenticated
	const isIncompleteSignup = initialAuthState.isIncompleteSignup

	const currentTheme = getPersonalInfoClass().defaultSiteTheme

	const shouldUseClassicForIncompleteSignup = isIncompleteSignup && isOpenPage

	// Determine if we should show internal layout
	const shouldShowInternalLayout = isAuthenticated &&
		!shouldUseClassicForIncompleteSignup &&
		(isPrivatePage || isOpenPage)

	return (
		<ThemeProvider initialTheme={currentTheme}>
			{shouldShowInternalLayout ? (
				<InternalPagesLayout>{children}</InternalPagesLayout>
			) : (
				<PublicOnlyPage isIncompleteSignup={isIncompleteSignup}>
					{children}
				</PublicOnlyPage>
			)}
		</ThemeProvider>
	)
}

export default observer(LayoutWrapper)
