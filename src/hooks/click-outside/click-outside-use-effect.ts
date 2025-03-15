"use client"

import { usePathname } from "next/navigation"
import { useCallback, useEffect } from "react"
import isUndefined from "lodash-es/isUndefined"

export default function useClickOutsideUseEffect(
	dropdownRef: React.RefObject<HTMLDivElement>,
	setIsOpen: (newState: boolean) => void
): void {
	const pathName = usePathname()

	const handleClickOutside = useCallback((event: MouseEvent) => {
		const themeToggler = document.getElementById("theme-toggler")
		const pipAutoConnectSlider = document.getElementById("pip-auto-connect-slider")
		if (
			dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
			(!themeToggler || !themeToggler.contains(event.target as Node)) &&
			(!pipAutoConnectSlider || !pipAutoConnectSlider.contains(event.target as Node))
		) {
			setIsOpen(false)
		}
	}, [dropdownRef, setIsOpen])

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return (): void => document.removeEventListener("mousedown", handleClickOutside)
	}, [handleClickOutside])

	useEffect(() => {
		if (isUndefined(setIsOpen)) return
		setIsOpen(false)
	}, [pathName, setIsOpen])
}
