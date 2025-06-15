"use client"

import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { CustomWizardHat } from "../../icons/custom-wizard-hat"
import pageTransitionClass from "../../../classes/page-transition-class"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import personalInfoClass from "../../../classes/personal-info-class"

function DemoReadingButton({ block } : { block: ContentBlock }) {
	const navigate = useTypedNavigate()

	const demoShadowColor = useMemo(() => {
		if (personalInfoClass.defaultSiteTheme === "light") {
			return "rgb(255 200 0)"
		}
		return "rgb(202 138 4)"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personalInfoClass.defaultSiteTheme])

	const navigateToDemo = useCallback(() => {
		pageTransitionClass.setDirection("down") // Set before navigating
		navigate(block.action.demoLink as LabPages)
	}, [block.action.demoLink, navigate])

	return (
		<TactileButton
			onClick={navigateToDemo}
			className={cn(
				"px-6 !py-5 text-3xl rounded-2xl w-full h-16",
				"bg-yellow-100 text-yellow-800",
				"dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200"
			)}
			shadowColor={demoShadowColor}
		>
			<><CustomWizardHat className="!w-8 !h-8" />DEMO</>
		</TactileButton>
	)
}

export default observer(DemoReadingButton)
