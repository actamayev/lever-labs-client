import { Control, FieldPath } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import CharacterCounter from "../../character-counter"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"
import useHandleTypeUsername from "../../../hooks/handle-type-validation/handle-type-username"

interface Props<T extends RegisterUsernameFormValues | RegisterFormValues> {
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
						<div className="relative">
							<Input
								placeholder="Username"
								{...field}
								onChange={(event) => {
									const sanitizedValue = handleTypeUsername(event)
									field.onChange(sanitizedValue)
								}}
								className="w-full pr-16 truncate h-12 rounded-xl !text-xl font-light border-2"
								maxLength={100}
								minLength={3}
							/>
							<CharacterCounter
								value={field.value}
								characterLimit={100}
								extraClasses="right-3"
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
