import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import WarehousePipWrapper from "../../../../../src/components/lab/lessons/led/code/warehouse-pip/warehouse-pip-wrapper"

export const metadata = createMetadata({
	title: "Warehouse Pip LED Code",
	// eslint-disable-next-line max-len
	description: "Implement LED controls for a warehouse robot scenario with this coding exercise. Create practical lighting patterns for navigation, status indication, and alerts.",
	path: "/lab/led/code/warehouse-pip",
	keywords: ["industrial robotics programming", "warehouse automation lights", "robot status signaling"]
})

export default function WarehousePipLEDCodePage() {
	return <WarehousePipWrapper />
}
