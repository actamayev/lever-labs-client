import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import LockIconAndTooltip from "../lock-icon-and-tooltip"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../shadcn/ui/form"

function EnterWifiPassword() {
	const addPipClass = useAddPipContext()
	const [showPassword, setShowPassword] = useState(false)

	if (_.isNull(addPipClass)) return null

	const { wifiNetworkName } = addPipClass.form.watch()

	return (
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
									addPipClass.store.encodeWifiData(wifiNetworkName || "", e.target.value)
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
	)
}

export default observer(EnterWifiPassword)
