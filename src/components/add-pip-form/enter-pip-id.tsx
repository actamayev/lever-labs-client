"use client"

import isNull from "lodash-es/isNull"
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
import useRetrievePipUUIDStatusInForm from "../../hooks/pip/retrieve-pip-uuid-status-in-form"

// 12/20/25 TODO: Make Pip ID OTP: https://ui.shadcn.com/docs/components/input-otp
function EnterPipID() {
	const addPipClass = useAddPipContext()
	const retrievePipUUIDStatusInForm = useRetrievePipUUIDStatusInForm()

	const cleanPipUUIDInput = useCallback(async (
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: PipUUID) => void
	) => {
		const input = event.target.value
		const allowedInput = input.replace(/[^a-zA-Z0-9]/g, "") as PipUUID
		if (allowedInput.length > 5) return
		if (isNull(addPipClass)) return

		onChange(allowedInput)
		addPipClass.store.updateMirroredFormValues("pipUUID", allowedInput)

		addPipClass.store.resetAddingPipRequirements()
		await retrievePipUUIDStatusInForm()
	}, [addPipClass, retrievePipUUIDStatusInForm])

	const tooltipMessage = useCallback((pipUUIDValid: boolean) => {
		if (isNull(addPipClass)) return ""
		if (pipUUIDValid && addPipClass.store.addingNewPipRequirements.doesPipUUIDExist) {
			return "Perfect! That's a valid Pip ID"
		}
		else if (addPipClass.store.addingNewPipRequirements.userAlreadyAddedUUID) {
			return "Looks like this Pip is already in your collection!"
		}
		else if (!pipUUIDValid) return "The Pip ID should be 5 characters long - check the package Pip came with"
		return "The entered Pip ID doesn't exist"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addPipClass, addPipClass?.store.addingNewPipRequirements.doesPipUUIDExist,
		addPipClass?.store.addingNewPipRequirements.userAlreadyAddedUUID])

	if (isNull(addPipClass)) return null

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
									className="w-full h-14 !text-2xl dark:border-gray-600 pr-8 focus:ring-0 focus:ring-offset-0
									focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
									placeholder="Pip ID"
								/>
								{showStatus && (
									<div className="absolute inset-y-0 right-3 flex items-center">
										<TooltipProvider delayDuration={0}>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														className="h-auto p-1.5 hover:bg-sidebarButtonHover"
													>
														{(pipUUIDValid && addPipClass.store.addingNewPipRequirements.doesPipUUIDExist) ? (
															<Check className="!h-7 !w-7 text-green-700 dark:text-green-500" />
														) : (
															<X className="!h-7 !w-7 text-cardinal dark:text-cardinal" />
														)}
													</Button>
												</TooltipTrigger>
												<TooltipContent>
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
