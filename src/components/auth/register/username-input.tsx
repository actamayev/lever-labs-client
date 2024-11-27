import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/ui/form"

interface Props {
	control: Control<RegisterFormValues>
}

export default function UsernameInput (props: Props) {
	const { control } = props

	return (
		<FormField
			control={control}
			name="username"
			render={({ field }) => (
				<FormItem className="grid gap-2">
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input
							placeholder="ada_lovelace"
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
