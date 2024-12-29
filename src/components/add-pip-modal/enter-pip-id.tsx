import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { Check, X } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import { Button } from "../shadcn/ui/button"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { FormField, FormItem, FormControl } from "../shadcn/ui/form"
import useRetrievePipUUIDStatus from "../../hooks/pip/retrieve-pip-uuid-status"

// TODO: Make Pip ID OTP: https://ui.shadcn.com/docs/components/input-otp
function EnterPipID() {
	const addPipClass = useAddPipContext()
	const retrievePipUUIDStatus = useRetrievePipUUIDStatus()

	const cleanPipUUIDInput = useCallback(async (
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: PipUUID) => void
	) => {
		const input = event.target.value
		const allowedInput = input.replace(/[^a-zA-Z0-9]/g, "") as PipUUID
		if (allowedInput.length > 5) return
		if (_.isNull(addPipClass)) return

		onChange(allowedInput)
		addPipClass.store.updateMirroredFormValues("pipUUID", allowedInput)

		addPipClass.store.resetAddingPipRequirements()
		await retrievePipUUIDStatus(allowedInput)
	}, [addPipClass, retrievePipUUIDStatus])

	const tooltipMessage = useCallback((pipUUIDValid: boolean) => {
		if (_.isNull(addPipClass)) return ""
		if (pipUUIDValid && addPipClass.store.addingNewPipRequirements.doesPipUUIDExist) return "Valid Pip ID"
		else if (addPipClass.store.addingNewPipRequirements.userAlreadyAddedUUID) return "You've already added this Pip ID"
		else if (!pipUUIDValid) return "Pip ID must be 5 alphanumeric characters"
		return "The entered Pip ID doesn't exist"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addPipClass, addPipClass?.store.addingNewPipRequirements.doesPipUUIDExist,
		addPipClass?.store.addingNewPipRequirements.userAlreadyAddedUUID])

	if (_.isNull(addPipClass)) return null

	return (
		<FormField
			control={addPipClass.form.control}
			name="pipUUID"
			render={({ field }) => {
				const pipUUIDValid = isPipUUIDValid(field.value)
				const showStatus = field.value.length > 0

				return (
					<FormItem>
						<FormControl>
							<div className="relative">
								<Input
									{...field}
									onChange={(e) => cleanPipUUIDInput(e, field.onChange)}
									className="w-full dark:border-zinc-600 pr-8 focus:ring-0 focus:ring-offset-0
									focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
									placeholder="Pip ID"
								/>
								{showStatus && (
									<div className="absolute inset-y-0 right-2 flex items-center">
										<TooltipProvider delayDuration={0}>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														className="h-auto p-1 dark:hover:bg-zinc-700"
													>
														{(pipUUIDValid &&
															addPipClass.store.addingNewPipRequirements.doesPipUUIDExist) ? (
																<Check className="h-4 w-4 text-green-700 dark:text-green-500" />
															) : (
																<X className="h-4 w-4 text-red-500 dark:text-red-500" />
															)}
													</Button>
												</TooltipTrigger>
												<TooltipContent side="top">
													{tooltipMessage(pipUUIDValid)}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								)}
							</div>
						</FormControl>
					</FormItem>
				)
			}}
		/>
	)
}

export default observer(EnterPipID)
