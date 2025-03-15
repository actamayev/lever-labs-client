"use client"

import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"

export default function EmailInput({ control }: { control: Control<RegisterFormValues> }) {
	return (
		<FormField
			control={control}
			name="email"
			render={({ field }) => (
				<FormItem className="grid gap-2">
					<FormControl>
						<Input
							placeholder="Email"
							{...field}
							maxLength={100}
							className="h-12 rounded-xl !text-xl font-light border-2"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
