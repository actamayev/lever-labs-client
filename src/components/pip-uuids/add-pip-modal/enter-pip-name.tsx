import { observer } from "mobx-react"
import { Check, X } from "lucide-react"
import { Control } from "react-hook-form"
import { useCallback, useMemo } from "react"
import { Input } from "../../shadcn/ui/input"
import { Button } from "../../shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"

interface Props {
	control: Control<IncompletePipData>
	formValues: IncompletePipData
}

function EnterPipName(props: Props) {
	const { control, formValues } = props
	const pipClass = usePipContext()

	const isDisabled = useMemo(() => {
		return !pipClass.addingNewPipRequirements.doesPipUUIDExist
	}, [pipClass.addingNewPipRequirements.doesPipUUIDExist])

	// If the backend retrieves a name for the pip, it should autofill this field, make it disabled, remove the /20, and
	// if (!pipClass.addingNewPipRequirements.isPipNameNeeded) return null

	const tooltipMessage = useCallback(() => {
		if (!formValues.pipName) return "Please give your Pip a name"
		if (formValues.pipName.length < 3) return "Pip name must be at least 3 characters"
		if (formValues.pipName.length > 20) return "Pip name can't be more than 20 characters"
		return "Valid Name"
	}, [formValues.pipName])

	return (
		<FormField
			control={control}
			name="pipName"
			disabled={isDisabled}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								maxLength={20}
								className="w-full dark:border-zinc-600 pr-16 focus:ring-0 focus:ring-offset-0
								focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
								placeholder="Name"
							/>
							{field.value && (
								<div className="absolute inset-y-0 right-9 flex items-center">
									<span className="text-xs text-muted-foreground">
										{field.value.length}/20
									</span>
								</div>
							)}
							{!isDisabled && (
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
													{(formValues.pipName &&
												formValues.pipName.length >= 3 && formValues.pipName.length <= 20) ? (
															<Check className="h-4 w-4 text-green-700 dark:text-green-500" />
														) : (
															<X className="h-4 w-4 text-red-500 dark:text-red-500" />
														)}
												</Button>
											</TooltipTrigger>
											<TooltipContent side="top">
												{tooltipMessage()}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default observer(EnterPipName)
