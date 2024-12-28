import _ from "lodash"
import { Plus } from "lucide-react"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import SingleAvailablePip from "./single-available-pip"
import { usePipContext } from "../../contexts/pip-context"
import { useAddPipContext } from "../../contexts/add-pip-context"

function AvailablePipsDropdown() {
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()

	const availablePips = useMemo(() => {
		return pipClass.pipData.filter(pip => pip.pipUUID !== pipClass.selectedPip?.pipUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.selectedPip, pipClass.pipData.length])

	const closeModal = useCallback(() => {
		if (_.isNull(addPipClass)) return
		addPipClass.store.setIsAppPipModalOpen(true)
	}, [addPipClass])

	return (
		<>
			{availablePips.map((pip) => (
				<SingleAvailablePip
					key={pip.pipUUID}
					pip={pip}
				/>
			))}
			<Button
				onClick={closeModal}
				className={cn(
					"w-full px-4 py-2 h-7 flex items-center gap-2 text-black dark:text-white",
					"bg-zinc-100 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-600 cursor-pointer"
				)}
			>
				<Plus className="h-4 w-4" />
				<span className="text-lg">Add Pip</span>
			</Button>
		</>
	)
}

export default observer(AvailablePipsDropdown)
