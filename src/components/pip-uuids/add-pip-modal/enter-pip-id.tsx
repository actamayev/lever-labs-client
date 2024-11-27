import { useCallback, useState } from "react"
import { Control } from "react-hook-form"
import { Input } from "../../shadcn/ui/input"
import ErrorMessage from "../../error-message"
import { cn } from "../../../lib/shadcn/utils"
import isPipUUIDValid from "../../../utils/is-pip-uuid-valid"
import useCheckIfPipUUIDIsValid from "../../../hooks/pip/check-if-pip-uuid-is-valid"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../shadcn/ui/form"

interface Props {
    control: Control<IncompletePipData>
    setIsPipNameNeeded: React.Dispatch<React.SetStateAction<boolean>>
    doesPipUUIDExist: boolean
    setDoesPipUUIDExist: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EnterPipID(props: Props) {
	const { control, setIsPipNameNeeded, doesPipUUIDExist, setDoesPipUUIDExist } = props
	const [userAlreadyAddedUUID, setUserAlreadyAddedUUID] = useState(false)
	const checkIfPipUUIDIsValid = useCheckIfPipUUIDIsValid()

	const cleanPipUUIDInput = useCallback(async (
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: PipUUID) => void
	) => {
		const input = event.target.value
		// Allow only alphanumeric characters and enforce a maximum length of 5 characters
		const allowedInput = input.replace(/[^a-zA-Z0-9]/g, "") as PipUUID
		if (allowedInput.length > 5) return

		onChange(allowedInput)
		setUserAlreadyAddedUUID(false)
		setDoesPipUUIDExist(false)
		setIsPipNameNeeded(false)
		await checkIfPipUUIDIsValid(
			allowedInput,
			setIsPipNameNeeded,
			setDoesPipUUIDExist,
			setUserAlreadyAddedUUID
		)
	}, [setUserAlreadyAddedUUID, setDoesPipUUIDExist, setIsPipNameNeeded, checkIfPipUUIDIsValid])

	return (
		<FormField
			control={control}
			name="pipUUID"
			render={({ field }) => {
				const pipUUIDValid = isPipUUIDValid(field.value)

				return (
					<FormItem>
						<FormLabel>Pip ID</FormLabel>
						<FormControl>
							<Input
								{...field}
								onChange={(e) => cleanPipUUIDInput(e, field.onChange)}
								className={cn(
									"text-zinc-950 dark:text-zinc-200 bg-white dark:bg-zinc-800",
									(pipUUIDValid && doesPipUUIDExist)
										? "border-green-500 dark:border-green-700"
										: "border-red-500 dark:border-red-500"
								)}
							/>
						</FormControl>
						{userAlreadyAddedUUID ? (
							<div className="mt-1">
								<ErrorMessage error="You've already added this Pip ID" />
							</div>
						) : (!doesPipUUIDExist && field.value.length === 5) && (
							<div className="mt-1">
								<ErrorMessage error="The entered Pip ID doesn't exist" />
							</div>
						)}
						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}
