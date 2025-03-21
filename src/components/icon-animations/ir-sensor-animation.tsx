"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { useMemo, useState } from "react"
import { CustomRemote } from "../icons/custom-remote"
import { bentoIconSize } from "../../utils/constants"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

function IRSensorAnimation() {
	const defaultTheme = useDefaultSiteTheme()
	const [isToggled, setIsToggled] = useState<boolean | null>(null)

	const textColor = useMemo(() => {
		if (isNull(isToggled)) {
			console.log(defaultTheme)
			if (defaultTheme === "dark") return "white"
			return "black"
		} else if (isToggled === false) {
			if (defaultTheme === "dark") return "white"
			return "black"
		} else {
			if (defaultTheme === "dark") return "white"
			return "black"
		}
	}, [defaultTheme, isToggled])

	return (
		<div
			className="cursor-pointer"
			onClick={() => setIsToggled(!isToggled)}
		>
			<CustomRemote
				size={bentoIconSize}
				className="transition-colors duration-300"
				fill={textColor}
			/>
		</div>
	)
}

export default observer(IRSensorAnimation)
