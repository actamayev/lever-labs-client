"use client"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the SchoolsPage component
const SchoolsPage = dynamic(() => import("../../src/test/schools"), {
	ssr: false, // Set to false if it uses browser-specific APIs
	loading: () => <div>Loading...</div>
})

export default function Schools() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SchoolsPage />
		</Suspense>
	)
}
