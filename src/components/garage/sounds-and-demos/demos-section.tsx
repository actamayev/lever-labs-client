"use client"

import { BlueTactileButton } from "../../buttons/tactile-buttons"

export default function DemosSection(): React.ReactNode {
	return (
		<div className="h-full flex flex-col items-center justify-between w-full my-10">
			{/* Add your demo content here */}
			<BlueTactileButton
				className="w-[80%] h-10 text-2xl duration-150"
				onClick={(): void => {
					alert("Demo button clicked!")
				}}
			>
				DEMO LIBRARY
			</BlueTactileButton>
			<BlueTactileButton
				className="w-[80%] h-10 text-2xl duration-150"
				onClick={(): void => {
					alert("Another demo button clicked!")
				}}
			>
				SENSOR DATA
			</BlueTactileButton>
			<BlueTactileButton
				className="w-[80%] h-10 text-2xl duration-150"
				onClick={(): void => {
					alert("Yet another demo button clicked!")
				}}
			>
				PARTY MODE
			</BlueTactileButton>
		</div>
	)
}
