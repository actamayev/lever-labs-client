import _ from "lodash"
import { Info } from "lucide-react"
import { observer } from "mobx-react"
import EnterWifiPassword from "./enter-wifi-password"
import EnterWifiNetworkName from "./enter-wifi-network-name"
import { useAddPipContext } from "../../contexts/add-pip-context"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import { Button } from "../shadcn/ui/button"

function EnterWifiCreds() {
	const addPipClass = useAddPipContext()

	if (
		_.isNull(addPipClass) ||
		addPipClass.store.addingNewPipRequirements.doesPipUUIDExist === false ||
		addPipClass.store.addingNewPipRequirements.isPipOnline
	) return null

	return (
		<>
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
									className="h-auto p-2 dark:hover:bg-zinc-700"
								>
									<Info style={{ width: "25px", height: "25px" }}/>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="top">
								Enter the Wi-Fi credentials you want {addPipClass.store.mirroredFormValues.pipName} to connect to
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
			<EnterWifiNetworkName />
			<EnterWifiPassword />
		</>
	)
}

export default observer(EnterWifiCreds)
