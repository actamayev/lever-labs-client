import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePipContext } from "../../../contexts/pip-context"
import useGetStatusColor from "../../../hooks/pip/get-status-color"

interface Props {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	handleSelectPip: (pip: PipData) => Promise<void>
}

function AvailablePipsDropdown(props: Props) {
	const { setIsModalOpen, handleSelectPip } = props
	const pipClass = usePipContext()
	const getStatusColor = useGetStatusColor()

	const availablePips = useMemo(() => {
		return pipClass.pipData.filter(pip => pip.pipUUID !== pipClass.selectedPip?.pipUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.selectedPip, pipClass.pipData.length])

	return (
		<div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50 overflow-hidden">
			{availablePips.map((pip) => (
				<div
					key={pip.pipUUID}
					className="flex items-center justify-between px-4 py-2 cursor-pointer
					hover:bg-slate-100 dark:hover:bg-slate-700"
					onClick={() => handleSelectPip(pip)}
				>
					<div className="flex items-center gap-2">
						<span className={`h-3 w-3 rounded-full ${getStatusColor(pip.pipConnectionStatus)}`}/>
						<span className="text-black dark:text-white truncate max-w-[160px]">{pip.pipName}</span>
					</div>
					<span className="text-sm text-slate-500">{pip.pipUUID}</span>
				</div>
			))}
			<div
				className="px-4 py-2 text-center text-black dark:text-white cursor-pointer
				hover:bg-slate-100 dark:hover:bg-slate-700"
				onClick={() => setIsModalOpen(true)}
			>
				+ Add Pip
			</div>
		</div>
	)
}

export default observer(AvailablePipsDropdown)

