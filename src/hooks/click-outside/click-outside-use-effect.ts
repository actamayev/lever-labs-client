import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useLocation } from "react-router"

export default function useClickOutsideUseEffect(
	dropdownRef: React.RefObject<HTMLDivElement>,
	setIsOpen: (newState: boolean) => void
): void {
	const location = useLocation()

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
		if (_.isUndefined(setIsOpen)) return
		setIsOpen(false)
	}, [location, setIsOpen])
}
