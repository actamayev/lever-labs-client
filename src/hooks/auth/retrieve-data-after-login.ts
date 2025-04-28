"use client"

import { useCallback } from "react"
import useRetrievePipInfo from "../pip/retrieve-pip-info"
import useRetrievePersonalInfo from "../personal-info/retrieve-personal-info"

export default function useRetrieveDataAfterLogin (): () => void {
	const retrievedPersonalInfo = useRetrievePersonalInfo()
	const retrievePipInfo = useRetrievePipInfo()

	return useCallback((): void => {
		try {
			void retrievedPersonalInfo()
			void retrievePipInfo()
		} catch (error: unknown) {
			console.error(error)
		}
	}, [retrievePipInfo, retrievedPersonalInfo])
}
