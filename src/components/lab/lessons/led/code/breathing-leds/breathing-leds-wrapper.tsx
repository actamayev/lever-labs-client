"use client"

import dynamic from "next/dynamic"

// This is where you use the dynamic import with ssr: false
const BreathingLEDsClient = dynamic(
	() => import("./breathing-leds-client"),
	{ ssr: false }
)

export default function BreathingLEDsWrapper() {
	return <BreathingLEDsClient />
}
