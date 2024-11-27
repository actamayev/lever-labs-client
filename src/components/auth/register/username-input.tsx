import { Control, FieldPath } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"
import useHandleTypeUsername from "../../../hooks/handle-type-validation/handle-type-username"

interface Props<T extends RegisterUsernameFormValues | RegisterFormValues>{
	control: Control<T>
}

export default function UsernameInput<T extends RegisterUsernameFormValues | RegisterFormValues>({
	control,
}: Props<T>) {
	const handleTypeUsername = useHandleTypeUsername()

	return (
		<FormField
			control={control}
			name={"username" as FieldPath<T>}
			render={({ field }) => (
				<FormItem className="grid gap-2">
					<FormControl>
						<Input
							placeholder="Username"
							{...field}
							onChange={(event) => {
								const sanitizedValue = handleTypeUsername(event)
								field.onChange(sanitizedValue)
							}}
							maxLength={100}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
