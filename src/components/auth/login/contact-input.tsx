import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

export default function ContactInput ({ control } : { control: Control<LoginFormValues>}) {
	return (
		<FormField
			control={control}
			name="contact"
			render={({ field }) => (
				<FormItem className="grid gap-2">
					<FormControl>
						<Input
							placeholder="Email or username"
							{...field}
							maxLength={100}
							min={3}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
