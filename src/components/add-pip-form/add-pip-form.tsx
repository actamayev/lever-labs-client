"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import AddPipButton from "./add-pip-button"
import BackButton from "../buttons/back-button"
import useAddPip from "../../hooks/pip/add-pip"
import ConnectUsbButton from "../connect-usb-button"
import WiFiScanSection from "./wifi-scan-section"
import { addPipSchema } from "../../utils/pip/pip-schemas"
import serialConnectionManagerClass from "../../classes/serial-manager-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"

// eslint-disable-next-line max-lines-per-function
function AddPipForm() {

	const form = useForm<IncompletePipData>({
		resolver: zodResolver(addPipSchema),
		defaultValues: {
			selectedWiFiNetworkName: "",
			selectedWiFiPassword: "",
			manualWiFiNetworkName: "", // Add this
			manualWiFiPassword: "", // Add this
			pipName: "Pip", // Default name
			pipUUID: null
		}
	})

	const resetAddPipVars = useCallback(() => {
		form.reset({
			selectedWiFiNetworkName: "",
			selectedWiFiPassword: "",
			manualWiFiNetworkName: "", // Add this
			manualWiFiPassword: "", // Add this
			pipName: "Pip", // Default name
			pipUUID: null
		})
		serialMessageManagerClass.setWiFiConnectionStatus(null)
		serialMessageManagerClass.setIsTestingWiFiConnection(false)
		// Clear scanned networks when resetting
		serialMessageManagerClass.clearScannedNetworks()
		serialMessageManagerClass.setIsScanning(false)
		// Only reset flow state if we're completely done or starting over
		if (!serialConnectionManagerClass.connected) {
			serialMessageManagerClass.resetFlowState()
		}
	}, [form])

	// Update pipUUID when pipId is received
	useEffect(() => {
		if (serialMessageManagerClass.pipId) {
			form.setValue("pipUUID", serialMessageManagerClass.pipId)
		}
	}, [form])

	const addPip = useAddPip(resetAddPipVars, () => form.getValues())

	return (
		<div>
			<div className="absolute top-6 left-4">
				<BackButton />
			</div>

			<Card className="mx-auto max-w-5xl border-0 mt-10 shadow-none bg-inherit">
				<CardHeader>
					<CardTitle className="text-6xl font-bold">Add Pip to your Account</CardTitle>
					Adding Pip to your account will allow you to control Pip wirelessly.
					Note: Please use Google Chrome or Microsoft Edge
					(Safari, Firefox, Internet explorer, and other browsers may not be compatible)
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(addPip)}
							onKeyDown={(e) => {
								if (e.key === "Enter") e.preventDefault()
							}}
						>
							<div className="flex flex-col text-3xl">
								{/* Step 1: USB Connection */}
								<div className="flex flex-row mb-6">
									<p className="font-bold">Step 1:&nbsp;</p>
									<p>Turn your Pip on, and plug it into your computer via USB. Press the Connect button below:</p>
								</div>
								<span><ConnectUsbButton /></span>

								{/* WiFi Section - Show only when connected */}
								{serialMessageManagerClass.showWiFiSection && (
									<div className="mt-8">
										<WiFiScanSection
											control={form.control}
											setValue={form.setValue}
										/>
									</div>
								)}

								{/* Step 3: Name Pip - Show only after WiFi success */}
								{(serialMessageManagerClass.isReadyToDisconnect) && (
									<>
										<div className="flex flex-row mb-6 mt-8">
											<p className="font-bold">Step 3:&nbsp;</p>
											<p>Name your Pip (optional)</p>
										</div>
										<EnterPipName control={form.control} />
										<div className="flex flex-row mb-6 mt-8">
											<p className="font-bold">Step 4:&nbsp;</p>
											<p>Unplug your Pip from USB and click Add to Account</p>
										</div>
										<AddPipButton getFormValues={() => form.getValues()} />
									</>
								)}
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(AddPipForm)
