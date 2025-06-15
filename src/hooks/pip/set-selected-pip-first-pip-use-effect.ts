"use client"

import { useEffect } from "react"
import { usePipContext } from "../../classes/pip-context"

export default function useSetSelectedPipFirstPipUseEffect(): void {
	const pipClass = usePipContext()
	useEffect(() => {
		pipClass.setSelectedPipToFirstPip()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.pipData.length])
}
