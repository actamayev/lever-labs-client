"use client"

import { Wifi, WifiHigh, WifiLow } from "lucide-react"

export default function NetworkStrengthIcon ({ rssi} : {rssi: number}) {
	if (rssi > -70) {
		return <Wifi className="h-4 w-4 text-gray-700" />
	} else if (rssi > -80) {
		return <WifiHigh className="h-4 w-4 text-gray-600" />
	}
	return <WifiLow className="h-4 w-4 text-gray-500" />
}
