import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { Input } from "../shadcn/ui/input"
import LockIconAndTooltip from "../lock-icon-and-tooltip"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../shadcn/ui/form"

function EnterWifiNetworkName() {
	const addPipClass = useAddPipContext()

	const typeNetworkName = useCallback((
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: string) => void
	) => {
		const input = event.target.value
		if (input.length > 50) return
		if (_.isNull(addPipClass)) return

		onChange(input)
		addPipClass.store.updateMirroredFormValues("wifiNetworkName", input)
	}, [addPipClass])

	if (_.isNull(addPipClass)) return null

	return (
		<FormField
			control={addPipClass.form.control}
			name="wifiNetworkName"
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								maxLength={50}
								className="w-full h-14 !text-2xl dark:border-zinc-600 pr-16 focus:ring-0 focus:ring-offset-0
								focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
								placeholder="Network Name"
								autoComplete="off"
								onChange={(e) => typeNetworkName(e, field.onChange)}
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
