"use client"

import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { PageToNavigateAfterLogin } from "../../utils/constants"

export default function useExitAfterAddPip(): (
	resetAddPipVars: () => void
) => void {
	const navigate = useTypedNavigate()

	return useCallback((
		resetAddPipVars: () => void
	) => {
		resetAddPipVars()
		navigate(PageToNavigateAfterLogin)
	}, [navigate])
}
