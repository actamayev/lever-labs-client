import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import ModuleAnimation from "../../icon-animations/module-animation"

export default function ModuleCard() {
	return (
		<SensorsSkeleton
			title="Modules: Expandable Capabilities"
			description="Snap on optional modules like a camera to extend Pip's functionality!"
			icon={<ModuleAnimation iconSize={bentoIconSize} />}
			outerDivStyles="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-1 row-start-4"
		/>
	)
}
