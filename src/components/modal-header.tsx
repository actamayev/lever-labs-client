import { FaTimes } from "react-icons/fa"
import HoverOutlineComponent from "./hover-outline-component"

interface Props {
	modalTitle: string
	toggleModalOpen: () => void
}

export default function ModalHeader(props: Props) {
	const { modalTitle, toggleModalOpen } = props

	return (
		<div className="flex justify-between items-center px-3 pt-1.5 border-b border-zinc-200 dark:border-zinc-700">
			<div className="text-lg font-bold">
				{modalTitle}
			</div>
			<HoverOutlineComponent
				classes="relative flex items-center justify-center inline-block"
				onClickAction={toggleModalOpen}
				circlePixelSize="33px"
			>
				<FaTimes />
			</HoverOutlineComponent>
		</div>
	)
}
