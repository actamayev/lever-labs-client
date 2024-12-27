import { useCallback } from "react"
import { Button } from "../../shadcn/ui/button"
import useStyledToast from "../../toast-options"

interface Props {
	formValues: IncompletePipData
	encodedWifiCredentials: string | null
}

export default function ConnectToPipInstructions(props: Props) {
	const { formValues, encodedWifiCredentials } = props
	const toast = useStyledToast()

	const openIpAddrTab = useCallback(() => {
		try {
			window.open(`http://192.168.4.1/setup/${encodedWifiCredentials}`, "_blank")
		} catch (error) {
			console.error("Failed to open setup page:", error)
			toast.negative({
				title: `Unable to connect ${formValues.pipName} to Wi-Fi at this time`,
				description: "Please reload page and try again"
			})
		}
	}, [encodedWifiCredentials, formValues.pipName, toast])

	if (!formValues.wifiNetworkName) return null

	return (
		<div className="my-1">
			<div className="flex flex-col">
				<div>
					Step 4: Send your Wi-Fi credentials to {formValues.pipName}
				</div>
				<div>
					1. Open your computer&apos;s Wi-Fi settings
				</div>
				<div>
					2. Connect to the Wi-Fi network:&nbsp;
					<span className="font-bold">
						pip-{formValues.pipUUID}
					</span>
				</div>
				<Button
					className="mt-1"
					onClick={openIpAddrTab}
				>
					Send Wi-Fi credentials
				</Button>
			</div>
		</div>
	)
}
