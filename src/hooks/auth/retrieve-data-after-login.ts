"use client"

import { useCallback } from "react"
import useRetrievePipInfo from "../pip/retrieve-pip-info"
import retrievePersonalInfo from "../personal-info/retrieve-personal-info"

export default function useRetrieveDataAfterLogin (): () => void {
	const retrievePipInfo = useRetrievePipInfo()

	return useCallback((): void => {
		try {
			void retrievePersonalInfo()
			void retrievePipInfo()
		} catch (error: unknown) {
			console.error(error)
		}
	}, [retrievePipInfo])
}
