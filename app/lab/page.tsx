"use client"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the LoginPage component
const TheLabPage = dynamic(() => import("../../src/components/lab/lab-structure/the-lab"), {
	ssr: false, // Set to false if it uses browser-specific APIs
})

export default function TheLab() {
	return (
		<Suspense>
			<TheLabPage />
		</Suspense>
	)
}
