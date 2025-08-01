"use client"

import { useCallback, useEffect } from "react"
import personalInfoClass from "../../classes/personal-info-class"

export default function useEffectSiteThemeListener(): void {
	const handleStorageChange = useCallback((event: StorageEvent): void => {
		if (
			event.key !== "defaultSiteTheme" ||
			(event.newValue !== "light" && event.newValue !== "dark")
		) return
		personalInfoClass.setDefaultSiteTheme(event.newValue, false)
	}, [])

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [handleStorageChange])
}
