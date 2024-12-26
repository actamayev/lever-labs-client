import { observer } from "mobx-react"
import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { usePipContext } from "../../../contexts/pip-context"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

function EnterPipName({ control } : { control: Control<IncompletePipData> }) {
	const pipClass = usePipContext()

	if (!pipClass.addingNewPipRequirements.isPipNameNeeded) return null

	return (
		<FormField
			control={control}
			name="pipName"
			render={({ field }) => (
				<FormItem className="mt-2">
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								maxLength={20}
								className="w-full dark:border-zinc-600 pr-16"
								placeholder="Name your Pip"
							/>
							<div className="absolute inset-y-0 right-3 flex items-center">
								<span className="text-xs text-muted-foreground">
									{field.value?.length || 0}/20
								</span>
							</div>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default observer(EnterPipName)
