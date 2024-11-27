import { Control } from "react-hook-form"
import Slider from "../../slider"
import { FormControl, FormField, FormItem, FormLabel } from "../../shadcn/ui/form"

export default function SelectAutoreconnectToPip({ control } : { control: Control<IncompletePipData>}) {
	return (
		<FormField
			control={control}
			name="shouldAutoConnect"
			render={({ field }) => (
				<FormItem className="flex items-center justify-between space-x-2">
					<FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Auto-connect
					</FormLabel>
					<FormControl>
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
	)
}
