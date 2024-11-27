import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

interface Props {
	control: Control<LoginFormValues>
}

export default function ContactInput (props: Props) {
	const { control } = props

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
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
