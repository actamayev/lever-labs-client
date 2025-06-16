"use client"

import { useEffect } from "react"
import pipClass from "../../classes/pip-class"

export default function useSetSelectedPipFirstPipUseEffect(): void {
	useEffect(() => {
		pipClass.setSelectedPipToFirstPip()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.pipData.length])
}
