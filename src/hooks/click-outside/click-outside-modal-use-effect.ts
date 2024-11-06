import { useCallback, useEffect } from "react"

export default function useClickOutsideModalUseEffect(
	mouseDownTarget: React.MutableRefObject<EventTarget | null>,
	modalRef: React.RefObject<HTMLDivElement>,
	toggleModalOpen: () => void
): void {
	const handleMouseDown = useCallback((event: MouseEvent) => {
		mouseDownTarget.current = event.target
	}, [mouseDownTarget])

	const handleMouseUp = useCallback((event: MouseEvent) => {
		if (modalRef.current &&
			!modalRef.current.contains(mouseDownTarget.current as Node) &&
			!modalRef.current.contains(event.target as Node)) {
			toggleModalOpen()
		}
	}, [modalRef, mouseDownTarget, toggleModalOpen])

	useEffect(() => {
		document.addEventListener("mousedown", handleMouseDown)
		document.addEventListener("mouseup", handleMouseUp)
		return (): void => {
			document.removeEventListener("mousedown", handleMouseDown)
			document.removeEventListener("mouseup", handleMouseUp)
		}
	}, [handleMouseDown, handleMouseUp])
}
