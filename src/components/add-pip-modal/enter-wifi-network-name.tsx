import _ from "lodash"
import { observer } from "mobx-react"
import { Input } from "../shadcn/ui/input"
import LockIconAndTooltip from "../lock-icon-and-tooltip"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../shadcn/ui/form"

function EnterWifiNetworkName() {
	const addPipClass = useAddPipContext()

	if (_.isNull(addPipClass)) return null

	const { wifiPassword } = addPipClass.form.watch()

	return (
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
									addPipClass.store.encodeWifiData(e.target.value, wifiPassword || "")
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
	)
}

export default observer(EnterWifiNetworkName)
