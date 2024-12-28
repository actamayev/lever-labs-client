import _ from "lodash"
import { observer } from "mobx-react"
import { Eye, EyeOff } from "lucide-react"
import { useCallback, useState } from "react"
import { Input } from "../../shadcn/ui/input"
import { Button } from "../../shadcn/ui/button"
import LockIconAndTooltip from "../../lock-icon-and-tooltip"
import { useAddPipContext } from "../../../contexts/add-pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

interface Props {
	setEncodedWifiCredentials: React.Dispatch<React.SetStateAction<string | null>>
}

// eslint-disable-next-line max-lines-per-function
function EnterWifiCreds(props: Props) {
	const { setEncodedWifiCredentials } = props
	const addPipClass = useAddPipContext()
	const [showPassword, setShowPassword] = useState(false)

	const encodeWifiData = useCallback((ssid: string, password: string) => {
		if (_.isEmpty(ssid)) {
			setEncodedWifiCredentials(null)
			return
		}
		const data = JSON.stringify({ ssid, password })
		setEncodedWifiCredentials(btoa(data))
	}, [setEncodedWifiCredentials])

	if (
		_.isNull(addPipClass) ||
		addPipClass.store.addingNewPipRequirements.doesPipUUIDExist === false ||
		addPipClass.store.addingNewPipRequirements.isPipOnline
	) return null

	const { pipName, wifiNetworkName, wifiPassword } = addPipClass.form.watch()

	return (
		<>
			<p className="my-1">Step 3: Connect {pipName} to Wi-Fi</p>
			<FormField
				control={addPipClass.form.control}
				name="wifiNetworkName"
				render={({ field }) => (
					<FormItem className="mt-2">
						<FormControl>
							<div className="relative">
								<Input
									{...field}
									maxLength={50}
									className="w-full dark:border-zinc-600 pr-16 focus:ring-0 focus:ring-offset-0
									focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
									placeholder="Network Name"
									autoComplete="off"
									onChange={(e) => {
										field.onChange(e.target.value)
										encodeWifiData(e.target.value, wifiPassword || "")
									}}
								/>
								<div className="absolute inset-y-0 right-2 flex items-center">
									<LockIconAndTooltip />
								</div>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={addPipClass.form.control}
				name="wifiPassword"
				render={({ field }) => (
					<FormItem className="mt-2">
						<FormControl>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									{...field}
									maxLength={200}
									className="w-full dark:border-zinc-600 pr-16 focus:ring-0 focus:ring-offset-0
									focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
									placeholder="Network Password"
									autoComplete="new-password"
									autoSave="off"
									onChange={(e) => {
										field.onChange(e.target.value)
										encodeWifiData(wifiNetworkName || "", e.target.value)
									}}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-9 top-1/2 -translate-y-1/2 h-auto p-1
									dark:hover:bg-zinc-600 hover:bg-slate-100"
									onClick={() => setShowPassword(prevState => !prevState)}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
								<div className="absolute inset-y-0 right-2 flex items-center">
									<LockIconAndTooltip />
								</div>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}

export default observer(EnterWifiCreds)
