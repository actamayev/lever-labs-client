interface Props {
	as?: React.ElementType
	className?: string
	label?: string
	maxValue?: number
	minDate?: string
	minValue?: number
	maxLength?: number
	multiline?: boolean
	name?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	pattern?: string
	placeholder?: string
	required?: boolean
	rows?: number
	type?: string
	step?: number
	value?: string
}

export default function FormGroup(props: Props) {
	const {
		as,
		className,
		label,
		maxValue,
		minDate,
		minValue,
		maxLength,
		multiline,
		name,
		onChange,
		onKeyDown,
		pattern,
		placeholder,
		required,
		rows,
		type,
		step,
		value
	} = props
	const Component = as || (multiline ? "textarea" : "input")

	const minAttribute = type === "datetime-local" ? minDate : minValue

	return (
		<div className={className}>
			{label && <label className="block text-sm text-zinc-600 dark:text-zinc-200 font-semibold">{label}</label>}
			<Component
				className={`mt-1 p-2 w-full border rounded-md text-zinc-950 dark:text-zinc-200 bg-white dark:bg-zinc-800 outline-none
					${value?.length === maxLength ? "border-red-500 dark:border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}
				max={maxValue}
				min={minAttribute}
				maxLength={maxLength}
				name={name}
				onChange={onChange}
				onKeyDown={onKeyDown}
				pattern={pattern}
				placeholder={placeholder}
				required={required}
				rows={multiline ? rows : undefined} // Apply rows only for textarea
				type={!multiline ? type || "text" : undefined} // Don't apply type to textarea
				step={!multiline ? step : undefined} // Don't apply step to textarea
				value={value}
			/>
		</div>
	)
}
