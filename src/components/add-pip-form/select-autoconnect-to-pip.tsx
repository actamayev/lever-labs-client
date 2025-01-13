import _ from "lodash"
import { Info } from "lucide-react"
import { useCallback } from "react"
import { observer } from "mobx-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import Slider from "../slider"
import { Button } from "../shadcn/ui/button"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { FormControl, FormField, FormItem } from "../shadcn/ui/form"

function SelectAutoreconnectToPip() {
	const addPipClass = useAddPipContext()

	const chooseAutoConnect = useCallback((
		onChange: (value: boolean) => void,
		currentValue: boolean
	) => {
		if (_.isNull(addPipClass)) return

		const newValue = !currentValue
		onChange(newValue)
		addPipClass.store.updateMirroredFormValues("shouldAutoConnect", newValue)
	}, [addPipClass])

	if (
		_.isNull(addPipClass) ||
		!addPipClass.store.addingNewPipRequirements.isPipOnline
	) return null

	return (
		<div className="mt-6">
			<FormField
				control={addPipClass.form.control}
				name="shouldAutoConnect"
				render={({ field }) => (
					<FormItem className="flex items-center justify-between space-x-2">
						<div className="flex items-center space-x-2">
							<div className="flex items-center font-semibold text-3xl">
								<p>Auto-connect</p>
							</div>
							<TooltipProvider delayDuration={0}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-auto p-1 dark:hover:bg-zinc-700 flex items-center"
										>
											<Info style={{ width: "25px", height: "25px" }}/>
										</Button>
									</TooltipTrigger>
									<TooltipContent side="top">
										This Pip is currently online. Auto-connect will connect you to this Pip
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<FormControl className="flex items-center">
							<Slider
								id="pip-auto-connect-slider"
								checkedCondition={field.value}
								onChangeCheckedCondition={() => chooseAutoConnect(field.onChange, field.value)}
								colorChangeOnToggle={true}
								size="xl"
							/>
						</FormControl>
					</FormItem>
				)}
			/>
		</div>
	)
}

export default observer(SelectAutoreconnectToPip)
