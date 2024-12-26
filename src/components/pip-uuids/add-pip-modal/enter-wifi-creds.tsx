import { useState } from "react"
import { observer } from "mobx-react"
import { Control } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "../../shadcn/ui/input"
import { Button } from "../../shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"
import LockIconAndTooltip from "../../lock-icon-and-tooltip"

interface Props {
	control: Control<IncompletePipData>
	formValues: IncompletePipData
}

function EnterWifiCreds(props: Props) {
	const { control, formValues } = props
	const pipClass = usePipContext()
	const [showPassword, setShowPassword] = useState(false)

	if (
		pipClass.addingNewPipRequirements.doesPipUUIDExist === false ||
		pipClass.addingNewPipRequirements.isPipOnline
	) return null

	return (
		<>
			<p className="my-1">Step 2: Connect {formValues.pipName} to Wi-Fi</p>
			<FormField
				control={control}
				name="wifiNetworkName"
				render={({ field }) => (
					<FormItem className="mt-2">
						<FormControl>
							<div className="relative">
								<Input
									{...field}
									maxLength={200}
									className="w-full dark:border-zinc-600 pr-16 focus:ring-0 focus:ring-offset-0
									focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
									placeholder="Network Name"
									autoComplete="off"
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
				control={control}
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
