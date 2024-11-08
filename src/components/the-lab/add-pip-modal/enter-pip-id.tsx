import { useCallback } from "react"
import isPipUUIDValid from "../../../utils/is-pip-uuid-valid"
import useCheckIfPipUUIDIsValid from "../../../hooks/pip/check-if-pip-uuid-is-valid"

interface Props {
	pipUUID: PipUUID
	setPipData: (value: React.SetStateAction<IncompletePipData>) => void
	setIsPipNameNeeded: React.Dispatch<React.SetStateAction<boolean>>
	doesPipUUIDExist: boolean
	setDoesPipUUIDExist: React.Dispatch<React.SetStateAction<boolean>>
	setUserAlreadyAddedUUID: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EnterPipID(props: Props) {
	const { pipUUID, setPipData, setIsPipNameNeeded, doesPipUUIDExist, setDoesPipUUIDExist, setUserAlreadyAddedUUID } = props
	const checkIfPipUUIDIsValid = useCheckIfPipUUIDIsValid()
	const pipUUIDValid = isPipUUIDValid(pipUUID)

	const cleanPipUUIDInput = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value
		// Allow only alphanumeric characters and enforce a maximum length of 5 characters
		const allowedInput = input.replace(/[^a-zA-Z0-9]/g, "") as PipUUID
		if (allowedInput.length > 5)  return
		setPipData(prev => ({ ...prev, pipUUID: allowedInput as PipUUID }))
		setUserAlreadyAddedUUID(false)
		setDoesPipUUIDExist(false)
		setIsPipNameNeeded(false)
		await checkIfPipUUIDIsValid(allowedInput, setIsPipNameNeeded, setDoesPipUUIDExist, setUserAlreadyAddedUUID)
	}, [checkIfPipUUIDIsValid, setDoesPipUUIDExist, setIsPipNameNeeded, setPipData, setUserAlreadyAddedUUID])

	return (
		<div>
			<div className="w-full">
				<label className="block text-sm text-slate-600 dark:text-slate-200 font-semibold">
					Pip ID
				</label>
				<input
					className={`mt-1 p-2 w-full border-2 rounded-md text-slate-950 dark:text-slate-200
					bg-white dark:bg-slate-800 outline-none
					${(pipUUIDValid && doesPipUUIDExist) ?
			"border-green-500 dark:border-green-700" : "border-red-500 dark:border-red-500"}`}
					value={pipUUID}
					onChange={cleanPipUUIDInput}
				/>
			</div>
		</div>
	)
}
