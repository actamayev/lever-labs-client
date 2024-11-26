import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/ui/form"
import { Input } from "../../shadcn/ui/input"
import { LoginFormValues } from "../../../utils/auth/auth-schemas"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<LoginFormValues, any>
}

export default function ContactInput (props: Props) {
	const { control } = props

	return (
		<FormField
			control={control}
			name="contact"
			render={({ field }) => (
				<FormItem className="mb-4">
					<FormLabel>Username or Email</FormLabel>
					<FormControl>
						<Input
							placeholder="abc@123.com"
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
