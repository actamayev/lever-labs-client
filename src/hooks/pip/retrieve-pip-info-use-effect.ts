"use client"

import { useEffect } from "react"
import useRetrievePipInfo from "./retrieve-pip-info"

export default function useRetrievePipInfoUseEffect(): void {
	const retrievePipInfo = useRetrievePipInfo()
	useEffect(() => {
		void retrievePipInfo()
	}, [retrievePipInfo])
}
