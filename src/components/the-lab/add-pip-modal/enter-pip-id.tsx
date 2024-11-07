import { useCallback, useMemo } from "react"

interface Props {
	pipUUID: PipUUID
	setPipData: (value: React.SetStateAction<IncompletePipData>) => void
}

export default function EnterPipID(props: Props) {
	const { pipUUID, setPipData } = props

	const cleanPipUUIDInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value
		const allowedInput = input.replace(/[^a-zA-Z0-9\-.]/g, "") // Allow only alphanumeric characters, dashes, and periods
		setPipData(prev => ({ ...prev, pipUUID: allowedInput as PipUUID }))
	}, [setPipData])

	const isUUIDValid = useMemo(() => {
		const pipUUIDPattern = /^[a-zA-Z0-9]{5}-\d+\.\d+\.\d+$/
		return pipUUIDPattern.test(pipUUID)
	}, [pipUUID])

	return (
		<div>
			<div className="w-full">
				<label className="block text-sm text-slate-600 dark:text-slate-200 font-semibold">
					Pip ID
				</label>
				<input
					className={`mt-1 p-2 w-full border rounded-md text-slate-950 dark:text-slate-200
					bg-white dark:bg-slate-800 outline-none
					${isUUIDValid ? "border-slate-200 dark:border-slate-700" : "border-red-500 dark:border-red-500"}`}
					value={pipUUID}
					onChange={cleanPipUUIDInput}
				/>
			</div>
		</div>
	)
}
