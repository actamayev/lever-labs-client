import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form"
import { Input } from "../shadcn/ui/input"

interface Props {
    control: Control<IncompletePipData>
}

export default function PipNameInput(props: Props) {
	const { control } = props

	return (
		<FormField
			control={control}
			name="pipName"
			render={({ field }) => (
				<FormItem className="space-y-0">
					<FormLabel>Pip Name</FormLabel>
					<FormControl>
						<Input
							{...field}
							maxLength={20}
							className="w-full"
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
