import { TactileButton } from "@/components/shadcn/ui/tactile-button"
import { CareerType, MeetPipTriggerType } from "@bluedotrobots/common-ts"
import careerQuestTrigger from "../../../utils/career-quest/career-quest-trigger"

export default function MeetPipS4P5FunSound(): React.ReactNode {
	return (
		<div>
			<TactileButton
				onClick={(): Promise<void> => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S4_P5_ENTER)}
				className="border-2 border-swan shadow-none rounded-xl"
			>
				YES
			</TactileButton>
		</div>
	)
}
