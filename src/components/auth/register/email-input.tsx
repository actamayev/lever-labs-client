import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/ui/form"
import { Input } from "../../shadcn/ui/input"
import { RegisterFormValues } from "../../../utils/auth/auth-schemas"

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<RegisterFormValues, any>
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
