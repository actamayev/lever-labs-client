"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Control, FieldPath } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { LoginRequest } from "@actamayev/lever-labs-common-ts/types/api"

interface PasswordFieldProps<T extends LoginRequest | RegisterFormValues> {
	control: Control<T>
	name: FieldPath<T>
	placeholder?: string
}

export default function PasswordField<T extends LoginRequest | RegisterFormValues>({
	control,
	name,
	placeholder = "Password"
}: PasswordFieldProps<T>): React.ReactNode {
	const [showPassword, setShowPassword] = useState(false)

	// TODO 6/9/25: Add showForgotPassword to handle forgot password functionality
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }): React.ReactElement => (
				<FormItem className="grid gap-2">
					<FormControl>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								{...field}
								value={field.value?.toString() || ""}
								placeholder={placeholder}
								maxLength={100}
								className="pr-16 truncate h-12 rounded-xl text-xl! font-light border-2 bg-polar shadow-none border-swan"
							/>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-polar"
								onClick={(): void => setShowPassword((prevState): boolean => !prevState)}
							>
								{showPassword ? (
									<EyeOff className="h-6! w-6!" />
								) : (
									<Eye className="h-6! w-6!" />
								)}
							</Button>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
