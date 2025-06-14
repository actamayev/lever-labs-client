"use client"

import { useState } from "react"
import { Control } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import LockIconAndTooltip from "../lock-icon-and-tooltip"
import { FormControl, FormField, FormItem, FormMessage } from "../shadcn/ui/form"

interface EnterWifiPasswordProps {
    control: Control<IncompletePipData>
    onSubmit?: () => void // Add optional submit handler
}

export default function EnterWifiPassword({ control, onSubmit }: EnterWifiPasswordProps) {
	const [showPassword, setShowPassword] = useState(false)

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== "Enter" || !onSubmit) return
		e.preventDefault()
		onSubmit()
	}

	return (
		<FormField
			control={control}
			name="manualWiFiPassword"
			render={({ field }) => (
				<FormItem className="mt-2">
					<FormControl>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								{...field}
								maxLength={200}
								className="w-full h-14 dark:border-gray-600 pr-16 focus:ring-0 focus:ring-offset-0 !text-2xl bg-polar
                                focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
								placeholder="Network Password"
								autoComplete="new-password"
								autoSave="off"
								onKeyDown={handleKeyDown} // Add the key handler
							/>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="absolute right-9 top-1/2 -translate-y-1/2 h-auto p-1.5 mr-4 hover:bg-swan"
								onClick={() => setShowPassword(prev => !prev)}
							>
								{showPassword ? (
									<EyeOff className="!h-7 !w-7" />
								) : (
									<Eye className="!h-7 !w-7" />
								)}
							</Button>
							<div className="absolute inset-y-0 right-2 flex items-center">
								<LockIconAndTooltip />
							</div>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
