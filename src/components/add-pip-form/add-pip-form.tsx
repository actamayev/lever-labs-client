"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card"
import EnterPipID from "./enter-pip-id"
import { Form } from "../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import AddPipButton from "./add-pip-button"
import BackButton from "../buttons/back-button"
import EnterWifiCreds from "./enter-wifi-creds"
import useAddPip from "../../hooks/pip/add-pip"
import { DottedTextTooltip } from "../dotted-underline-text"
import SelectAutoreconnectToPip from "./select-autoconnect-to-pip"
import { useAddPipContext } from "../../contexts/add-pip-context"
import UploadWiFiCredentials from "./upload-wifi-credentials"
import ConnectUsbButton from "../connect-usb-button"

function AddPipForm() {
	const addPip = useAddPip(true)
	const addPipClass = useAddPipContext()

	if (isNull(addPipClass)) return null

	return (
		<div>
			<div className="absolute top-6 left-4">
				<BackButton />
			</div>

			<Card className="mx-auto max-w-5xl border-0 mt-10 shadow-none bg-inherit">
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
									<p>Turn your Pip on, and plug it into the computer. Press the Connect button below:</p>
								</div>
								<span>
									<ConnectUsbButton />
								</span>

								<div className="flex flex-row mb-6">
									<p className="font-bold">Step 2:&nbsp;</p>
									<p>
            Enter your
										<DottedTextTooltip tooltipMessage="Look for a 5-character code in the package Pip came with">
            Pip's ID
										</DottedTextTooltip>
            and pick a name for your new friend
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

								{/* Add Step 3 header */}
								<div className="flex flex-row mb-6">
									<p className="font-bold">Step 3:&nbsp;</p>
									<p>Enter your WiFi credentials</p>
								</div>
								<EnterWifiCreds />
								<UploadWiFiCredentials />

								<SelectAutoreconnectToPip />
								<AddPipButton />
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(AddPipForm)
