import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleAvailablePip from "./single-available-pip"
import { usePipContext } from "../../../contexts/pip-context"

interface Props {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AvailablePipsDropdown(props: Props) {
	const { setIsModalOpen } = props
	const pipClass = usePipContext()

	const availablePips = useMemo(() => {
		return pipClass.pipData.filter(pip => pip.pipUUID !== pipClass.selectedPip?.pipUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.selectedPip, pipClass.pipData.length])

	return (
		<div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-zinc-800 rounded-lg shadow-lg z-50">
			{availablePips.map((pip) => (
				<SingleAvailablePip
					key={pip.pipUUID}
					pip={pip}
				/>
			))}
			<div
				className="px-4 py-2 text-center text-black dark:text-white cursor-pointer
				hover:bg-zinc-100 dark:hover:bg-zinc-700"
				onClick={() => setIsModalOpen(true)}
			>
				+ Add Pip
			</div>
		</div>
	)
}

export default observer(AvailablePipsDropdown)

