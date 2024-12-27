import { useCallback } from "react"
import { observer } from "mobx-react"
import { Check, X } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import ErrorMessage from "../../error-message"
import { Button } from "../../shadcn/ui/button"
import isPipUUIDValid from "../../../utils/is-pip-uuid-valid"
import { usePipContext } from "../../../contexts/pip-context"
import useCheckIfPipUUIDIsValid from "../../../hooks/pip/check-if-pip-uuid-is-valid"
import { FormField, FormItem, FormControl, FormMessage } from "../../shadcn/ui/form"

interface Props {
	form: UseFormReturn<IncompletePipData>
}

// TODO: Make Pip ID OTP: https://ui.shadcn.com/docs/components/input-otp
function EnterPipID(props: Props) {
	const { form } = props
	const pipClass = usePipContext()
	const checkIfPipUUIDIsValid = useCheckIfPipUUIDIsValid()

	const cleanPipUUIDInput = useCallback(async (
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: PipUUID) => void
	) => {
		const input = event.target.value
		const allowedInput = input.replace(/[^a-zA-Z0-9]/g, "") as PipUUID
		if (allowedInput.length > 5) return

		onChange(allowedInput)
		pipClass.resetAddingPipRequirements()
		await checkIfPipUUIDIsValid(allowedInput, form)
	}, [checkIfPipUUIDIsValid, form, pipClass])

	const tooltipMessage = useCallback((pipUUIDValid: boolean) => {
		if (pipUUIDValid && pipClass.addingNewPipRequirements.doesPipUUIDExist) return "Valid Pip ID"
		else if (pipClass.addingNewPipRequirements.userAlreadyAddedUUID) return "You've already added this Pip ID"
		else if (!pipUUIDValid) return "Pip ID must be 5 alphanumeric characters"
		return "The entered Pip ID doesn't exist"
	}, [pipClass.addingNewPipRequirements.doesPipUUIDExist, pipClass.addingNewPipRequirements.userAlreadyAddedUUID])

	return (
		<>
			<FormField
				control={form.control}
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
															{(pipUUIDValid && pipClass.addingNewPipRequirements.doesPipUUIDExist) ? (
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
							{pipClass.addingNewPipRequirements.userAlreadyAddedUUID ? (
								<div className="mt-1">
									<ErrorMessage error="You've already added this Pip ID" />
								</div>
							) : (!pipClass.addingNewPipRequirements.doesPipUUIDExist && field.value.length === 5) && (
								<div className="mt-1">
									<ErrorMessage error="The entered Pip ID doesn't exist" />
								</div>
							)}
							<FormMessage />
						</FormItem>
					)
				}}
			/>
		</>

	)
}

export default observer(EnterPipID)
