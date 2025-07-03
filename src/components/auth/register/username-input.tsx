"use client"

import { Control, FieldPath } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import CharacterCounter from "../../character-counter"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"
import { handleTypeUsername } from "../../../utils/handle-type-validation/handle-type-fields"

// Base interface for any form that has a username field
interface FormWithUsername {
	username: string
}

interface Props<T extends FormWithUsername> {
	control: Control<T>
}

export default function UsernameInput<T extends FormWithUsername>({
	control,
}: Props<T>) {
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
								value={field.value.toString() || ""}
								onChange={(event) => {
									const sanitizedValue = handleTypeUsername(event)
									field.onChange(sanitizedValue)
								}}
								className="w-full pr-16 truncate h-12 rounded-xl !text-xl \
								font-light border-2 bg-polar shadow-none border-swan"
								maxLength={100}
							/>
							<CharacterCounter
								value={field.value.toString() || ""}
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
