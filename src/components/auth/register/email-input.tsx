"use client"

import { Control, useWatch } from "react-hook-form"
import { Input } from "../../ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form"

export default function EmailInput({ control }: { control: Control<RegisterFormValues> }): React.ReactNode {
	// Watch the age field to determine placeholder text
	const ageValue = useWatch({
		control,
		name: "age"
	})

	// Determine placeholder based on age
	const getPlaceholder = (): string => {
		if (ageValue && ageValue < 13) {
			return "Parent's email"
		}
		return "Email"
	}

	return (
		<FormField
			control={control}
			name="email"
			render={({ field }): React.ReactElement => (
				<FormItem className="grid gap-2">
					<FormControl>
						<Input
							placeholder={getPlaceholder()}
							{...field}
							maxLength={100}
							className="h-12 rounded-xl text-xl! font-light border-2 bg-polar shadow-none border-swan"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
