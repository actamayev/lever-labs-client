"use client"

import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { CustomWizardHat } from "../../icons/custom-wizard-hat"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { usePageTransitionContext } from "../../../contexts/page-transition-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

function DemoReadingButton({ block } : { block: ContentBlock }) {
	const defaultSiteTheme = useDefaultSiteTheme()
	const pageTransitionClass = usePageTransitionContext()
	const navigate = useTypedNavigate()

	const demoShadowColor = useMemo(() => {
		if (defaultSiteTheme === "light") {
			return "rgb(255 200 0)"
		}
		return "rgb(202 138 4)"
	}, [defaultSiteTheme])


	const demoClasses = useMemo(() => {
		return "bg-yellow-100 border-bee text-yellow-800 \
		dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200"
	}, [])

	const navigateToDemo = useCallback(() => {
		pageTransitionClass.setDirection("down") // Set before navigating
		navigate(block.action.demoLink as LabPages)
	}, [block.action.demoLink, navigate, pageTransitionClass])

	return (
		<TactileButton
			onClick={navigateToDemo}
			className={cn(
				"px-6 !py-5 text-3xl rounded-2xl border-2 w-full h-16",
				demoClasses
			)}
			shadowColor={demoShadowColor}
		>
			<><CustomWizardHat className="!w-8 !h-8" />DEMO</>
		</TactileButton>
	)
}

export default observer(DemoReadingButton)
