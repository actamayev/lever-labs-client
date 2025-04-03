"use client"

import isNull from "lodash-es/isNull"
import { Info } from "lucide-react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import CustomTooltip from "../custom-tooltip"
import { useAddPipContext } from "../../contexts/add-pip-context"

function EnterWifiInstructions() {
	const addPipClass = useAddPipContext()

	if (isNull(addPipClass)) return null

	return (
		<div className="flex flex-row items-center">
			<div className="my-6">
				<div className="flex flex-row">
					<p className="font-bold">
						Step 3:&nbsp;
					</p>
					Connect {addPipClass.store.mirroredFormValues.pipName} to Wi-Fi
				</div>
			</div>
			<div className="ml-2">
				<CustomTooltip
					tooltipTrigger={
						<Button
							type="button"
							variant="ghost"
							size="lg"
							className="h-auto p-2 hover:bg-polar"
						>
							<Info style={{ width: "25px", height: "25px" }}/>
						</Button>
					}
					tooltipContent={addPipClass.store.mirroredFormValues.pipName
						? `Help ${addPipClass.store.mirroredFormValues.pipName} connect to your Wi-Fi network`
						: "Enter your Wi-Fi details to get connected"}
				/>
			</div>
		</div>
	)
}

export default observer(EnterWifiInstructions)
