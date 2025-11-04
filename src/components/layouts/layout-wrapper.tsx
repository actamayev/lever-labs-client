"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import { AuthState } from "@/lib/auth-server"
import { usePathname } from "next/navigation"
import PublicOnlyPage from "./public-only-page"
import authClass from "../../classes/auth-class"
import ThemeProvider from "../theme/theme-provider"
import InternalPagesLayout from "./internal-pages-layout"
import personalInfoClass from "../../classes/personal-info-class"
import { PrivatePageNames, OpenPages } from "../../utils/constants/page-constants"
import careerQuestClass from "@/classes/career-quest-class"

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

	// Sync server auth state with client even on open pages (covers reloads)
	useEffect((): void => {
		if (!authClass.isLoggedIn && initialAuthState.isAuthenticated) {
			authClass.setAuthState({
				isAuthenticated: initialAuthState.isAuthenticated,
				hasCompletedSignup: initialAuthState.hasCompletedSignup
			})
			careerQuestClass.reinitialize()
		}
	}, [initialAuthState.isAuthenticated, initialAuthState.hasCompletedSignup])

	const isPrivatePage = PrivatePageNames.some((path): boolean => pathname.startsWith(path))
	const isOpenPage = OpenPages.some((path): boolean => pathname.startsWith(path))
	const isAuthenticated = authClass.isLoggedIn || initialAuthState.isAuthenticated
	const isIncompleteSignup = initialAuthState.isIncompleteSignup

	const currentTheme = personalInfoClass.defaultSiteTheme

	// Show internal layout for authenticated users on private pages, or on open pages when signup is complete
	const shouldShowInternalLayout = isAuthenticated && (
		isPrivatePage || (isOpenPage && !isIncompleteSignup)
	)

	return (
		<ThemeProvider initialTheme={currentTheme}>
			{shouldShowInternalLayout ? (
				<InternalPagesLayout>
					{children}
				</InternalPagesLayout>
			) : (
				<PublicOnlyPage>
					{children}
				</PublicOnlyPage>
			)}
		</ThemeProvider>
	)
}

export default observer(LayoutWrapper)
