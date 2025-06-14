"use client"

import { Control } from "react-hook-form"
import { Input } from "../shadcn/ui/input"
import LockIconAndTooltip from "../lock-icon-and-tooltip"
import { FormControl, FormField, FormItem, FormMessage } from "../shadcn/ui/form"

interface EnterWifiNetworkNameProps {
    control: Control<IncompletePipData>
    onSubmit?: () => void // Add optional submit handler
}

export default function EnterWifiNetworkName({ control, onSubmit }: EnterWifiNetworkNameProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && onSubmit) {
			e.preventDefault()
			onSubmit()
		}
	}

	return (
		<FormField
			control={control}
			name="manualWiFiNetworkName"
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								maxLength={50}
								className="w-full h-14 !text-2xl dark:border-gray-600 pr-16 focus:ring-0 focus:ring-offset-0 bg-polar
                                focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
								placeholder="Network Name"
								autoComplete="off"
								onKeyDown={handleKeyDown} // Add the key handler
							/>
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
