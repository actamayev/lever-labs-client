"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Control, FieldPath } from "react-hook-form"
import { Input } from "@/components/shadcn/ui/input"
import { Button } from "@/components/shadcn/ui/button"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/ui/form"
import { LoginRequest } from "@bluedotrobots/common-ts"
// import Link from "next/link"

interface PasswordFieldProps<T extends LoginRequest | RegisterFormValues> {
	control: Control<T>
	name: FieldPath<T>
	placeholder?: string
	// showForgotPassword?: boolean
}

export default function PasswordField<T extends LoginRequest | RegisterFormValues>({
	control,
	name,
	placeholder = "Password"
	// showForgotPassword = false
}: PasswordFieldProps<T>) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="grid gap-2">
					{/* <div className="flex items-center justify-between">
						{showForgotPassword && (
							<Link href="/forgot-password" className="text-sm text-foreground/60 hover:text-foreground underline">
								Forgot your password?
							</Link>
						)}
					</div> */}
					<FormControl>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								placeholder={placeholder}
								{...field}
								maxLength={100}
								className="pr-16 truncate h-12 rounded-xl !text-xl font-light border-2 bg-polar shadow-none border-swan"
							/>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-polar"
								onClick={() => setShowPassword(prevState => !prevState)}
							>
								{showPassword ? (
									<EyeOff className="!h-6 !w-6" />
								) : (
									<Eye className="!h-6 !w-6" />
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
