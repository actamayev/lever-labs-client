import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/ui/form"
import { Input } from "../../shadcn/ui/input"

interface Props {
	control: Control<RegisterFormValues>
}

export default function EmailInput (props: Props) {
	const { control } = props

	return (
		<FormField
			control={control}
			name="email"
			render={({ field }) => (
				<FormItem className="mb-4">
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input
							placeholder="ada@lovelace.com"
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
