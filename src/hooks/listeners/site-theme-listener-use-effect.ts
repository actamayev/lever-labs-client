import { useCallback, useEffect } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useSiteThemeListenerUseEffect(): void {
	const personalInfoClass = usePersonalInfoContext()

	const handleStorageChange = useCallback((event: StorageEvent): void => {
		if (
			event.key !== "defaultSiteTheme" ||
			(event.newValue !== "light" && event.newValue !== "dark")
		) return
		personalInfoClass.setDefaultSiteTheme(event.newValue, false)
	}, [personalInfoClass])

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [handleStorageChange])
}
