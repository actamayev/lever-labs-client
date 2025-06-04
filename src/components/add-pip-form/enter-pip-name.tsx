"use client"

import { Check, X } from "lucide-react"
import { Control } from "react-hook-form"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import CustomTooltip from "../custom-tooltip"
import CharacterCounter from "../character-counter"
import { FormControl, FormField, FormItem } from "../shadcn/ui/form"
import { useCallback } from "react"

export default function EnterPipName({ control }: { control: Control<IncompletePipData> }) {
	const getTooltipMessage = useCallback((pipName: string) => {
		if (!pipName) return "What would you like to name your Pip?"
		if (pipName.length < 3) return "Let's make the name a bit longer - at least 3 characters"
		if (pipName.length > 20) return "That's a bit long! Could you shorten it to 20 characters?"
		return "Perfect name!"
	}, [])

	return (
		<FormField
			control={control}
			name="pipName"
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								maxLength={20}
								minLength={3}
								className="w-full h-14 !text-2xl dark:border-gray-600 pr-8 focus:ring-0 focus:ring-offset-0 bg-polar
								focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
								placeholder="Pip"
							/>
							<CharacterCounter
								value={field.value}
								characterLimit={20}
								extraClasses="right-12"
							/>
							<div className="absolute inset-y-0 right-2 flex items-center">
								<CustomTooltip
									tooltipTrigger={
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-auto p-1.5 hover:bg-polar"
										>
											{(field.value && field.value.length >= 3 && field.value.length <= 20) ? (
												<Check className="!h-7 !w-7 text-green-700 dark:text-green-500" />
											) : (
												<X className="!h-7 !w-7 text-cardinal dark:text-cardinal" />
											)}
										</Button>
									}
									tooltipContent={getTooltipMessage(field.value || "")}
								/>
							</div>
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
