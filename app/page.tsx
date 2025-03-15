import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the Landing component
const Landing = dynamic(() => import("../src/test/landing"), {
	ssr: true,
	loading: () => <div>Loading...</div>
})

export default function Home() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Landing />
		</Suspense>
	)
}
