"use client"

import { observer } from "mobx-react"
import { Input } from "../../shadcn/ui/input"
import { cn } from "../../../lib/shadcn/utils"
import careerQuestTriggersClass from "../../../classes/career-quest-triggers-class"
import RenderDisplay from "../../garage/display/render-display"
import personalInfoClass from "../../../classes/personal-info-class"
import editName from "../../../utils/personal-info/edit-name"

function MeetPipS3P4Display(): React.ReactNode {
	const setTextInput = async (text: string): Promise<void> => {
		await careerQuestTriggersClass.setTextInput(text)
		void editName(text)
	}

	return (
		<div className="space-y-8">
			{/* Display */}
			<div className="flex justify-center">
				<RenderDisplay pixelBuffer={careerQuestTriggersClass.pixelBuffer} />
			</div>

			{/* Text input */}
			<div className="flex justify-center">
				<Input
					placeholder="Enter text..."
					value={personalInfoClass.name || ""}
					onChange={(e): Promise<void> => setTextInput(e.target.value)}
					className={cn(
						"border-2 pr-6 border-swan rounded-2xl !text-xl text-center bg-inherit shadow-none",
						"[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
						"[&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 font-medium"
					)}
					style={{ height: "60px", width: "300px" }}
				/>
			</div>
		</div>
	)
}

export default observer(MeetPipS3P4Display)
