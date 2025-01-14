import _ from "lodash"
import { observer } from "mobx-react"
import EnterPipID from "./enter-pip-id"
import { Form } from "../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import AddPipButton from "./add-pip-button"
import EnterWifiCreds from "./enter-wifi-creds"
import useAddPip from "../../hooks/pip/add-pip"
import SelectAutoreconnectToPip from "./select-autoconnect-to-pip"
import { useAddPipContext } from "../../contexts/add-pip-context"
import ConnectToPipInstructions from "./connect-to-pip-ip-instructions"
import ShowLoadingPipConnectionStatus from "./show-loading-pip-connection-status"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card"
import { DottedTextTooltip } from "../dotted-underline-text"

function AddPipForm() {
	const addPip = useAddPip(true)
	const addPipClass = useAddPipContext()

	if (_.isNull(addPipClass)) return null

	return (
		<Card className="mx-auto max-w-5xl border-0 mt-0 shadow-none">
			<CardHeader>
				<CardTitle className="text-6xl font-bold">Add Pip</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...addPipClass.form}>
					<form
						onSubmit={addPipClass.form.handleSubmit(addPip)}
						onKeyDown={(e) => {
							if (e.key === "Enter") e.preventDefault()
						}}
					>
						<div className="flex flex-col text-3xl">
							<div className="flex flex-row mb-6">
								<p className="font-bold">Step 1:&nbsp;</p>
								<p>Turn on your Pip</p>
							</div>
							<div className="flex flex-row mb-6">
								<p className="font-bold">Step 2:&nbsp;</p>
								<p>
									Enter your&nbsp;
									<DottedTextTooltip tooltipMessage="Look for a 5-character code in the package Pip came with">
										Pip&apos;s ID
									</DottedTextTooltip>
									&nbsp;and pick a name for your new friend
								</p>
							</div>
							<div className="flex flex-row gap-4">
								<div className="w-1/3">
									<EnterPipID />
								</div>
								<div className="flex-1">
									<EnterPipName />
								</div>
							</div>
							<EnterWifiCreds />
							<ConnectToPipInstructions />
							<SelectAutoreconnectToPip />
							<ShowLoadingPipConnectionStatus />
							<AddPipButton />
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default observer(AddPipForm)
