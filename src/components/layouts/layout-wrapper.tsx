// src/components/layouts/layout-wrapper.tsx
"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import { AuthState } from "@/lib/auth-server"
import { usePathname } from "next/navigation"
import PublicOnlyPage from "./classic-layout"
import authClass from "../../classes/auth-class"
import ThemeProvider from "../theme/theme-provider"
import InternalPagesLayout from "./internal-pages-layout"
import personalInfoClass from "../../classes/personal-info-class"
import { PrivatePageNames, OpenPages } from "../../utils/constants/page-constants"

interface LayoutWrapperProps {
	children: React.ReactNode
	initialAuthState: AuthState
}

function LayoutWrapper({ children, initialAuthState }: LayoutWrapperProps): React.ReactNode {
	const pathname = usePathname()

	// Sync theme from server on mount
	useEffect((): void => {
		personalInfoClass.setDefaultSiteTheme(initialAuthState.theme, false)
	}, [initialAuthState.theme])

	const isPrivatePage = PrivatePageNames.some((path): boolean => pathname.startsWith(path))
	const isOpenPage = OpenPages.some((path): boolean => pathname.startsWith(path))
	const isAuthenticated = authClass.isLoggedIn || initialAuthState.isAuthenticated
	const isIncompleteSignup = initialAuthState.isIncompleteSignup

	const currentTheme = personalInfoClass.defaultSiteTheme

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
