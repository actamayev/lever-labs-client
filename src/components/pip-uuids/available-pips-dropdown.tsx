import { useMemo } from "react"
import { observer } from "mobx-react"
import SingleAvailablePip from "./single-available-pip"
import { usePipContext } from "../../contexts/pip-context"
import { cn } from "../../lib/shadcn/utils"
import { Plus } from "lucide-react"
import { Button } from "../shadcn/ui/button"

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
		<>
			{availablePips.map((pip) => (
				<SingleAvailablePip
					key={pip.pipUUID}
					pip={pip}
				/>
			))}
			<Button
				onClick={() => setIsModalOpen(true)}
				className={cn(
					"w-full px-4 py-2 h-7 flex items-center gap-2 text-black dark:text-white mt-2",
					"bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-800 cursor-pointer"
				)}
			>
				<Plus className="h-4 w-4" />
				<span>Add Pip</span>
			</Button>
		</>
	)
}

export default observer(AvailablePipsDropdown)

