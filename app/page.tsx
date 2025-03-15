import dynamic from "next/dynamic"

// Dynamically import the Landing component
const Landing = dynamic(() => import("../src/test/landing"), {
	ssr: true,
})

export default function Home() {
	return (
		<Landing />
	)
}
