"use client"

import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

type Props = {
  extraClasses?: string;
  children: React.ReactNode;
  noSpaceBefore?: boolean;
  noSpaceAfter?: boolean;
};

function DefinitionText (props: Props) {
	const {
		extraClasses,
		children,
		noSpaceBefore = false,
		noSpaceAfter = false,
	} = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<>
			{!noSpaceBefore && <> </>}
			<span
				className={cn(
					"font-bold px-1 rounded dark:text-yellow-300",
					extraClasses
				)}
				style={{
					backgroundColor: defaultSiteTheme === "light" ? "rgb(255, 255, 0)" : "rgba(180, 140, 0, 0.3)"
				}}
			>
				{children}
			</span>
			{!noSpaceAfter && <> </>}
		</>
	)
}

export default observer(DefinitionText)
