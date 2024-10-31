import { useState } from "react"
import Button from "../button"
import AddPipModal from "./add-pip-modal"
import ShowExistingPips from "./show-existing-pips"

export default function PipUUIDs() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<ShowExistingPips />
			<Button
				title="Add a Pip"
				onClick={() => setIsModalOpen(true)}
				className="text-white"
			/>
			{isModalOpen && (
				<AddPipModal toggleModalOpen={() => setIsModalOpen(false)} />
			)}
		</>
	)
}
