import { Control } from "react-hook-form"
import Slider from "../../slider"
import { FormControl, FormField, FormItem, FormLabel } from "../../shadcn/ui/form"

export default function SelectAutoreconnectToPip({ control } : { control: Control<IncompletePipData>}) {
	return (
		<FormField
			control={control}
			name="shouldAutoConnect"
			render={({ field }) => (
				<FormItem className="mt-3 grid gap-2">
					<FormLabel>Auto-connect?</FormLabel>
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
