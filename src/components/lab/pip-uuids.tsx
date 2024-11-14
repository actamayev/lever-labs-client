import { useState } from "react"
import AddPipModal from "./add-pip-modal/add-pip-modal"
import ShowExistingPips from "./show-existing-pips"

export default function PipUUIDs() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<ShowExistingPips setIsModalOpen={setIsModalOpen}/>
			{isModalOpen && (
				<AddPipModal toggleModalOpen={() => setIsModalOpen(false)} />
			)}
		</>
	)
}
