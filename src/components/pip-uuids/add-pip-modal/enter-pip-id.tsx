import { useCallback } from "react"
import { observer } from "mobx-react"
import { Check, X } from "lucide-react"
import { Control } from "react-hook-form"
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
	control: Control<IncompletePipData>
}

function EnterPipID(props: Props) {
	const { control } = props
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
		await checkIfPipUUIDIsValid(allowedInput)
	}, [checkIfPipUUIDIsValid, pipClass])

	const tooltipMessage = useCallback((pipUUIDValid: boolean) => {
		if (pipUUIDValid && pipClass.addingNewPipRequirements.doesPipUUIDExist) return "Valid Pip ID"
		else if (pipClass.addingNewPipRequirements.userAlreadyAddedUUID) return "You've already added this Pip ID"
		else if (!pipUUIDValid) return "Invalid Pip ID: Pip ID must be 5 characters"
		return "The entered Pip ID doesn't exist"
	}, [pipClass.addingNewPipRequirements.doesPipUUIDExist, pipClass.addingNewPipRequirements.userAlreadyAddedUUID])

	return (
		<FormField
			control={control}
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
									className="pr-8 dark:border-zinc-600"
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
	)
}

export default observer(EnterPipID)
