import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

export default function EnterPipName({ control } : { control: Control<IncompletePipData> }) {
	return (
		<FormField
			control={control}
			name="pipName"
			render={({ field }) => (
				<FormItem className="space-y-0 mt-2">
					<FormControl>
						<Input
							{...field}
							maxLength={20}
							className="w-full dark:border-zinc-600 pr-8"
							placeholder="Name your Pip"
						/>
					</FormControl>
					<div className="h-1"/> {/* Small spacer */}
					<span className="text-xs text-zinc-600 dark:text-zinc-400 ml-0.5">
						{field.value?.length || 0}/20
					</span>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
