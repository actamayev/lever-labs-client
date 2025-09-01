import { TactileButton } from "@/components/shadcn/ui/tactile-button"
import careerQuestTrigger from "../../../utils/career-quest/career-quest-trigger"
import { CareerType, IntroductionTriggerType } from "@bluedotrobots/common-ts"

export default function IntroductionS2P4LightShow() {
	return (
		<div>
			<TactileButton
				onClick={() => careerQuestTrigger(CareerType.INTRODUCTION, IntroductionTriggerType.S2_P4_ENTER)}
				className="border-2 border-swan shadow-none rounded-xl"
			>
				YES
			</TactileButton>
		</div>
	)
}
