import _ from "lodash"
import { useCallback } from "react"
import { Button } from "../../shadcn/ui/button"

interface Props {
	formValues: IncompletePipData
	setEncodedWifiCredentials: React.Dispatch<React.SetStateAction<string | null>>
}

export default function EncodeWifiDataButton(props: Props) {
	const { formValues, setEncodedWifiCredentials } = props

	const encodeWifiData = useCallback(() => {
		const data = JSON.stringify({
			ssid: formValues.wifiNetworkName,
			password: formValues.wifiPassword
		})
		setEncodedWifiCredentials(btoa(data))
	}, [formValues.wifiNetworkName, formValues.wifiPassword, setEncodedWifiCredentials])

	if (!formValues.wifiNetworkName) return null

	return (
		<div className="flex justify-between mt-2 items-center">
			<Button
				disabled={_.isEmpty(formValues.wifiNetworkName)}
				onClick={encodeWifiData}
			>
				Save Wi-Fi
			</Button>
		</div>
	)
}
