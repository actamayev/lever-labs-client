"use client"

import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Form } from "../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import AddPipButton from "./add-pip-button"
import BackButton from "../buttons/back-button"
import useAddPip from "../../hooks/pip/add-pip"
import ConnectUsbButton from "../connect-usb-button"
import EnterWifiPassword from "./enter-wifi-password"
import { addPipSchema } from "../../utils/pip/pip-schemas"
import EnterWifiNetworkName from "./enter-wifi-network-name"
import UploadWiFiCredentials from "./upload-wifi-credentials"

function AddPipForm() {
	const [userAlreadyAddedUUID, setUserAlreadyAddedUUID] = useState(false)
	const [wiFiConnectionStatus, setWiFiConnectionStatus] = useState<WiFiConnectionStatus | null>(null)
	const [isTestingWiFiConnection, setIsTestingWiFiConnection] = useState(false)
	const form = useForm<IncompletePipData>({
		resolver: zodResolver(addPipSchema),
		defaultValues: {
			wiFiNetworkName: "",
			wiFiPassword: "",
			pipName: "",
			pipUUID: null
		}
	})

	const resetAddPipVars = useCallback(() => {
		form.reset()
		setUserAlreadyAddedUUID(false)
		setWiFiConnectionStatus(null)
		setIsTestingWiFiConnection(false)
	}, [form])
	const addPip = useAddPip(resetAddPipVars, form.getValues())

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
								<div className="flex flex-row mb-6">
									<p className="font-bold">Step 1:&nbsp;</p>
									<p>Turn your Pip on, and plug it into your computer via USB. Press the Connect button below:</p>
								</div>
								<span>
									<ConnectUsbButton />
								</span>
								{/* Add Step 3 header */}
								<div className="flex flex-row mb-6">
									<p className="font-bold">Step 3:&nbsp;</p>
									<p>Enter your WiFi credentials</p>
								</div>
								<EnterWifiNetworkName control={form.control}/>
								<EnterWifiPassword control={form.control}/>
								<UploadWiFiCredentials
									formValues={form.getValues()}
									isTestingWiFiConnection={isTestingWiFiConnection}
									wifiConnectionStatus={wiFiConnectionStatus}
									setIsTestingWiFiConnection={setIsTestingWiFiConnection}
									setWifiConnectionStatus={setWiFiConnectionStatus}

								/>

								<EnterPipName control={form.control} />
								<AddPipButton
									wiFiConnectionStatus={wiFiConnectionStatus}
									wiFiNetworkName={form.getValues().wiFiNetworkName}
								/>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(AddPipForm)
