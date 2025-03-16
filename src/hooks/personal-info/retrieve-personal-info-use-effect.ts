"use client"

import { useEffect } from "react"
import useRetrievePersonalInfo from "./retrieve-personal-info"

export default function useRetrievePersonalInfoUseEffect(): void {
	const retrievePersonalInfo = useRetrievePersonalInfo()
	useEffect(() => {
		void retrievePersonalInfo()
	}, [retrievePersonalInfo])
}
