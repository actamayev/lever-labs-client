import { useMemo } from "react"
import { observer } from "mobx-react"
import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { usePipContext } from "../../../contexts/pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

function EnterPipName({ control } : { control: Control<IncompletePipData> }) {
	const pipClass = usePipContext()

	const isDisabled = useMemo(() => {
		return !pipClass.addingNewPipRequirements.doesPipUUIDExist
	}, [pipClass.addingNewPipRequirements.doesPipUUIDExist])

	// If the backend retrieves a name for the pip, it should autofill this field, make it disabled, remove the /20, and
	// if (!pipClass.addingNewPipRequirements.isPipNameNeeded) return null

	return (
		<FormField
			control={control}
			name="pipName"
			disabled={isDisabled}
			render={({ field }) => (
				<FormItem className="mt-2">
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
								<div className="absolute inset-y-0 right-3 flex items-center">
									<span className="text-xs text-muted-foreground">
										{field.value.length}/20
									</span>
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
