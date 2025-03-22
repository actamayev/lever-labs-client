"use client"

import { Info } from "lucide-react"
import { useCallback } from "react"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import CustomSwitch from "../custom-switch"
import { Button } from "../shadcn/ui/button"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { FormControl, FormField, FormItem } from "../shadcn/ui/form"

function SelectAutoreconnectToPip() {
	const addPipClass = useAddPipContext()

	const chooseAutoConnect = useCallback((
		onChange: (value: boolean) => void,
		currentValue: boolean
	) => {
		if (isNull(addPipClass)) return

		const newValue = !currentValue
		onChange(newValue)
		addPipClass.store.updateMirroredFormValues("shouldAutoConnect", newValue)
	}, [addPipClass])

	if (
		isNull(addPipClass) ||
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
											className="h-auto p-1 hover:bg-polar flex items-center"
										>
											<Info style={{ width: "25px", height: "25px" }}/>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										This Pip is currently online. Auto-connect will connect you to this Pip
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<FormControl className="flex items-center">
							<CustomSwitch
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
