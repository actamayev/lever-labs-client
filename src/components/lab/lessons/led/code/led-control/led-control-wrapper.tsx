"use client"

import dynamic from "next/dynamic"

// This is where you use the dynamic import with ssr: false
const LEDControlClient = dynamic(
	() => import("./led-control-client"),
	{ ssr: false }
)

export default function LEDControlWrapper() {
	return <LEDControlClient />
}
