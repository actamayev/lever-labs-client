"use client"

import isNull from "lodash-es/isNull"
import { Info } from "lucide-react"
import { observer } from "mobx-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import { Button } from "../shadcn/ui/button"
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
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="button"
								variant="ghost"
								size="lg"
								className="h-auto p-2 hover:bg-sidebarButtonHover"
							>
								<Info style={{ width: "25px", height: "25px" }}/>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							{addPipClass.store.mirroredFormValues.pipName
								? `Help ${addPipClass.store.mirroredFormValues.pipName} connect to your Wi-Fi network`
								: "Enter your Wi-Fi details to get connected"}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	)
}

export default observer(EnterWifiInstructions)
