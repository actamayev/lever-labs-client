import { TactileButton } from "@/components/shadcn/ui/tactile-button"
import careerQuestTrigger from "../../../utils/career-quest/career-quest-trigger"
import { CareerType, MeetPipTriggerType } from "@bluedotrobots/common-ts"

export default function MeetPipS2P4LightShow(): React.ReactNode {
	return (
		<div>
			<TactileButton
				onClick={(): Promise<void> => careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S2_P4_ENTER)}
				className="border-2 border-swan shadow-none rounded-xl"
			>
				YES
			</TactileButton>
		</div>
	)
}
