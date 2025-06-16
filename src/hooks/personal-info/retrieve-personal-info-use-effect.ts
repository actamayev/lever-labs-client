"use client"

import { useEffect } from "react"
import retrievePersonalInfo from "./retrieve-personal-info"

export default function useRetrievePersonalInfoUseEffect(): void {
	useEffect(() => {
		void retrievePersonalInfo()
	}, [])
}
