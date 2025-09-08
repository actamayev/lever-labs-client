// src/components/theme/theme-provider.tsx
"use client"

import { useEffect } from "react"
import { SiteThemes } from "@bluedotrobots/common-ts"

interface ThemeProviderProps {
	children: React.ReactNode
	initialTheme: SiteThemes
}

export default function ThemeProvider({ children, initialTheme }: ThemeProviderProps): React.ReactNode {
	useEffect(() => {
		// Apply theme to document on mount and when theme changes
		if (initialTheme === "dark") {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}, [initialTheme])

	return <>{children}</>
}
