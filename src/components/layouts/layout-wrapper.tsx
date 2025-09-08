// src/components/layouts/layout-wrapper.tsx
"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { observer } from "mobx-react"
import ClassicLayout from "./classic-layout"
import InternalPagesLayout from "./internal-pages-layout"
import ThemeProvider from "../theme/theme-provider"
import authClass from "../../classes/auth-class"
import personalInfoClass from "../../classes/personal-info-class"
import { PrivatePageNames, OpenPages } from "../../utils/constants/page-constants"
import { AuthState } from "@/lib/auth-server"

interface LayoutWrapperProps {
	children: React.ReactNode
	initialAuthState: AuthState
}

function LayoutWrapper({ children, initialAuthState }: LayoutWrapperProps): React.ReactNode {
	const pathname = usePathname()

	// Sync server auth state and theme with client on mount
	useEffect((): void => {
		// Sync auth state
		if (!authClass.isLoggedIn && initialAuthState.isAuthenticated) {
			authClass.setAuthState({
				isAuthenticated: initialAuthState.isAuthenticated,
				hasCompletedSignup: initialAuthState.hasCompletedSignup
			})
		}

		// Sync theme from server
		personalInfoClass.setDefaultSiteTheme(initialAuthState.theme, false)
	}, [initialAuthState])

	const isPrivatePage = PrivatePageNames.some((path): boolean => pathname.startsWith(path))
	const isOpenPage = OpenPages.some((path): boolean => pathname.startsWith(path))

	// Use MobX auth state for reactive updates, fallback to server state
	const isAuthenticated = authClass.isLoggedIn || initialAuthState.isAuthenticated
	const currentTheme = personalInfoClass.defaultSiteTheme

	// Determine if we should show internal layout
	const shouldShowInternalLayout = isAuthenticated && (isPrivatePage || isOpenPage)

	return (
		<ThemeProvider initialTheme={currentTheme}>
			{shouldShowInternalLayout ? (
				<InternalPagesLayout>{children}</InternalPagesLayout>
			) : (
				<ClassicLayout>{children}</ClassicLayout>
			)}
		</ThemeProvider>
	)
}

export default observer(LayoutWrapper)
