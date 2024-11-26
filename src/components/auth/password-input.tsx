import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Control, FieldPath } from "react-hook-form"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form"

interface PasswordFieldProps<T extends LoginFormValues | RegisterFormValues> {
	control: Control<T>
	name: FieldPath<T>
	label?: string
	placeholder?: string
}

export default function PasswordField<T extends LoginFormValues | RegisterFormValues>({
	control,
	name,
	label = "Password",
	placeholder = "Enter password"
}: PasswordFieldProps<T>) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="mb-4">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								placeholder={placeholder}
								{...field}
								maxLength={100}
							/>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
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
