import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/ui/form"
import { Input } from "../../shadcn/ui/input"

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
				<FormItem className="mb-4">
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input
							placeholder="abcxyz"
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
