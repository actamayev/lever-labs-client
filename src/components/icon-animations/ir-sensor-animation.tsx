"use client"

import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import { CustomRemote } from "../icons/custom-remote"
import { bentoIconSize } from "../../utils/constants"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

// Define the color states
const COLORS = ["black", "white"]

function IRSensorAnimation() {
	const defaultTheme = useDefaultSiteTheme()
	// Start at -1 (theme-based default), then cycle through COLORS
	const [colorIndex, setColorIndex] = useState(-1)

	const handleClick = useCallback(() => {
		setColorIndex((prevIndex) => (prevIndex + 1) % COLORS.length)
	}, [])

	// Determine initial color based on theme if colorIndex is -1
	const isDefaultColor = colorIndex === -1
	// eslint-disable-next-line no-nested-ternary, @typescript-eslint/no-unused-vars
	const textColor = isDefaultColor
		? defaultTheme === "dark"
			? "white"
			: "black"
		: COLORS[colorIndex]

	return (
		<div className="cursor-pointer" onClick={handleClick}>
			<CustomRemote
				size={bentoIconSize}
				className="transition-colors duration-300 text-questionText"
				// fill={textColor}
			/>
		</div>
	)
}

export default observer(IRSensorAnimation)
