"use client"

import Link from "next/link"
import { Control, FieldPath } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"
import { handleTypeAge } from "../../../utils/handle-type-validation/handle-type-fields"

interface Props<T extends { age: number | null }> {
	control: Control<T>
}

export default function AgeInput<T extends { age: number | null }>({
	control,
}: Props<T>): React.ReactNode {
	// TODO: 6/9/25: Fix the placeholder text color (dark mode) to reflect Duolingo.
	return (
		<FormField
			control={control}
			name={"age" as FieldPath<T>}
			render={({ field }): React.ReactElement => (
				<FormItem className="grid gap-2">
					<FormControl>
						<Input
							type="text"
							inputMode="numeric"
							placeholder="Age"
							{...field}
							value={field.value?.toString() || ""}
							onChange={(event): void => {
								const sanitizedValue = handleTypeAge(event)
								// Convert to number or null
								const numericValue = sanitizedValue === "" ? null : parseInt(sanitizedValue, 10)
								field.onChange(numericValue)
							}}
							className="w-full h-12 rounded-xl !text-xl font-light border-2 bg-polar shadow-none border-swan"
							maxLength={3}
						/>
					</FormControl>
					<FormMessage />
					<div className="text-sm text-wolf mt-1">
						<span>
							Providing your age ensures you get the right Blue Dot Robots experience. For more details, please visit our{" "}
						</span>
						<Link
							href="/privacy"
							className="text-macaw"
						>
							Privacy Policy
						</Link>
						<span>.</span>
					</div>
				</FormItem>
			)}
		/>
	)
}
