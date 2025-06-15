"use client"

import { useMemo } from "react"
import personalInfoClass from "../../classes/personal-info-class"

export default function useUsername (): string | null {

	return useMemo(() => {
		return personalInfoClass.username
	}, [personalInfoClass.username])
}
