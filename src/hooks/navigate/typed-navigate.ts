"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

export default function useTypedNavigate (): (route: PageNames) => void {
	const router = useRouter()

	return useCallback((route: PageNames): void => {
		router.push(route)
	}, [router])
}
