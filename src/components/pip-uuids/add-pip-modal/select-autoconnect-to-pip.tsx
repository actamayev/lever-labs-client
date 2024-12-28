import { Info } from "lucide-react"
import { observer } from "mobx-react"
import { Control } from "react-hook-form"
import Slider from "../../slider"
import { Button } from "../../shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import { FormControl, FormField, FormItem, FormLabel } from "../../shadcn/ui/form"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"

function SelectAutoreconnectToPip({ control } : { control: Control<IncompletePipData>}) {
	const pipClass = usePipContext()

	if (!pipClass.addingNewPipRequirements.isPipOnline) return null

	return (
		<div className="mt-2">
			<FormField
				control={control}
				name="shouldAutoConnect"
				render={({ field }) => (
					<FormItem className="flex items-center justify-between space-x-2">
						<div className="flex items-center space-x-2">
							<FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
						peer-disabled:opacity-70 flex items-center">
							Auto-connect
							</FormLabel>
							<TooltipProvider delayDuration={0}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-auto p-1 dark:hover:bg-zinc-700 flex items-center"
										>
											<Info size={15}/>
										</Button>
									</TooltipTrigger>
									<TooltipContent side="top">
									This Pip is currently online. Auto-connect will connect you to this Pip
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<FormControl className="flex items-center">
							<Slider
								id="pip-auto-connect-slider"
								checkedCondition={field.value}
								onChangeCheckedCondition={() => field.onChange(!field.value)}
								colorChangeOnToggle={true}
							/>
						</FormControl>
					</FormItem>
				)}
			/>
		</div>

	)
}

export default observer(SelectAutoreconnectToPip)
