"use client"

import { useEffect } from "react"
import getPipClass from "../../classes/pip-class"

export default function useEffectSetSelectedPipFirstPip(): void {
	useEffect((): void => {
		getPipClass().setSelectedPipToFirstPip()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getPipClass().pipData.length])
}
