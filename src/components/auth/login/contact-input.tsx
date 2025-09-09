"use client"

import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "../../shadcn/ui/form"
import { LoginRequest } from "@bluedotrobots/common-ts/types/api"

export default function ContactInput ({ control } : { control: Control<LoginRequest>}): React.ReactNode {
	return (
		<FormField
			control={control}
			name="contact"
			render={({ field }): React.ReactElement => (
				<FormItem className="grid gap-2">
					<FormControl>
						<Input
							placeholder="Email or username"
							{...field}
							maxLength={100}
							min={3}
							className="h-12 !text-xl font-light bg-polar shadow-none border-swan"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
