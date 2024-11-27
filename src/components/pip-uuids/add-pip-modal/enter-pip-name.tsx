import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

export default function EnterPipName({ control } : { control: Control<IncompletePipData> }) {
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
