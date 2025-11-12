"use client"

import { observer } from "mobx-react"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import garageClass from "../../../classes/garage-class"

function DemosSection(): React.ReactNode {
	const handleSensorDataClick = (): void => {
		garageClass.setIsSensorDataOpen(!garageClass.isSensorDataOpen)
	}

	return (
		<div className="h-full flex flex-col items-center justify-between w-full my-10">
			{/* Add your demo content here */}
			<BlueTactileButton className="w-[80%] h-10 text-2xl duration-0">
				DEMO LIBRARY
			</BlueTactileButton>
			<BlueTactileButton className="w-[80%] h-10 text-2xl duration-0" onClick={handleSensorDataClick}>
				SENSOR DATA
			</BlueTactileButton>
			<BlueTactileButton className="w-[80%] h-10 text-2xl duration-0">
				PARTY MODE
			</BlueTactileButton>
		</div>
	)
}

export default observer(DemosSection)
