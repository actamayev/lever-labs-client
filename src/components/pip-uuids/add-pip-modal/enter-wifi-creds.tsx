import { useState } from "react"
import { observer } from "mobx-react"
import { Control } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "../../shadcn/ui/input"
import { Button } from "../../shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

function EnterWifiCreds({ control } : { control: Control<IncompletePipData> }) {
	const pipClass = usePipContext()
	const [showPassword, setShowPassword] = useState(false)

	if (
		pipClass.addingNewPipRequirements.doesPipUUIDExist === false ||
		pipClass.addingNewPipRequirements.isPipOnline
	) return null

	return (
		<>
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
									className="w-full dark:border-zinc-600 pr-16"
									placeholder="Network Name"
									autoComplete="off"
								/>
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
									className="w-full dark:border-zinc-600 pr-16"
									placeholder="Password"
									autoComplete="new-password"
									autoSave="off"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1
									dark:hover:bg-zinc-600 hover:bg-slate-100"
									onClick={() => setShowPassword(prevState => !prevState)}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
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
