"use client"

import dynamic from "next/dynamic"

// This is where you use the dynamic import with ssr: false
const WarehousePipClient = dynamic(
	() => import("./warehouse-pip-client"),
	{ ssr: false }
)

export default function WarehousePipWrapper() {
	return <WarehousePipClient />
}
