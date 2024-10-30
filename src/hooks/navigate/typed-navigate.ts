import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export default function useTypedNavigate (): (route: PageNames) => void {
	const navigate = useNavigate()

	return useCallback((route: PageNames): void => {
		navigate(route)
	}, [navigate])
}
