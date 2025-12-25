"use client"

// src/utils/cookies/theme-helpers.ts
import { SiteThemes } from "@actamayev/lever-labs-common-ts/types/utils"

// eslint-disable-next-line @typescript-eslint/naming-convention
const THEME_COOKIE_NAME = "site_theme"

export const setThemeCookie = (theme: SiteThemes): void => {
	if (typeof document !== "undefined") {
		// Set cookie with 1 year expiration
		document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`
	}
}

export const getThemeFromCookie = (): SiteThemes => {
	if (typeof document === "undefined") return "light"

	const cookies = document.cookie.split(";")
	const themeCookie = cookies.find((cookie): boolean =>
		cookie.trim().startsWith(`${THEME_COOKIE_NAME}=`)
	)

	if (themeCookie) {
		const theme = themeCookie.split("=")[1].trim() as SiteThemes
		return theme === "dark" ? "dark" : "light"
	}

	return "light"
}
