import _ from "lodash"
import { observer } from "mobx-react"
import { Check, X } from "lucide-react"
import { useCallback, useMemo } from "react"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { FormControl, FormField, FormItem } from "../shadcn/ui/form"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"

function EnterPipName() {
	const addPipClass = useAddPipContext()

	const isDisabled = useMemo(() => {
		return !addPipClass?.store.addingNewPipRequirements.doesPipUUIDExist
	}, [addPipClass?.store.addingNewPipRequirements.doesPipUUIDExist])

	// If the backend retrieves a name for the pip, it should autofill this field, make it disabled, remove the /20, and
	// if (!pipClass.addingNewPipRequirements.isPipNameNeeded) return null

	const tooltipMessage = useCallback(() => {
		if (_.isNull(addPipClass)) return ""
		const {pipName} = addPipClass.store.mirroredFormValues
		if (!pipName) return "Please give your Pip a name"
		if (pipName.length < 3) return "Pip's name must be at least 3 characters"
		if (pipName.length > 20) return "Pip's name can't be more than 20 characters"
		return "Valid Name"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addPipClass, addPipClass?.store.mirroredFormValues.pipName])

	const typePipName = useCallback((
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: string) => void
	) => {
		const input = event.target.value
		if (input.length > 20) return
		if (_.isNull(addPipClass)) return

		onChange(input)
		addPipClass.store.updateMirroredFormValues("pipName", input)
	}, [addPipClass])

	if (_.isNull(addPipClass)) return null

	return (
		<FormField
			control={addPipClass.form.control}
			name="pipName"
			disabled={isDisabled}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								maxLength={20}
								className="w-full h-14 !text-2xl dark:border-zinc-600 pr-8 focus:ring-0 focus:ring-offset-0
								focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
								placeholder="Name"
								onChange={(e) => typePipName(e, field.onChange)}
							/>
							{field.value && (
								<div className="absolute inset-y-0 right-14 flex items-center">
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
													className="h-auto p-1.5 dark:hover:bg-zinc-700"
												>
													{(field.value && field.value.length >= 3 && field.value.length <= 20) ? (
														<Check className="!h-7 !w-7 text-green-700 dark:text-green-500" />
													) : (
														<X className="!h-7 !w-7 text-red-500 dark:text-red-500" />
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
				</FormItem>
			)}
		/>
	)
}

export default observer(EnterPipName)
