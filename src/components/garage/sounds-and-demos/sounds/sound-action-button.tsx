"use client"

import { Bot } from "lucide-react"
import { observer } from "mobx-react"
import { useRef, useEffect } from "react"
import { FunSounds } from "@bluedotrobots/common-ts/types/garage"
import { cn } from "../../../../lib/shadcn/utils"
import { CustomUfo } from "../../../icons/custom-ufo"
import { CustomFart } from "../../../icons/custom-fart"
import getGarageClass from "../../../../classes/garage-class"
import { CustomEngine } from "../../../icons/custom-engine"
import { CustomElephant } from "../../../icons/custom-elephant"
import { TactileButton } from "../../../shadcn/ui/tactile-button"
import { CustomCountdown } from "../../../icons/custom-countdown"
import playFunSound from "../../../../utils/garage/play-fun-sound"
import { CustomPartyPopper } from "../../../icons/custom-party-popper"
import { CustomHearNoEvilMonkey } from "../../../icons/custom-hear-no-evil-monkey"
import { CustomSpeakNoEvilMonkey } from "../../../icons/custom-speak-no-evil-monkey"

interface SoundActionButtonProps {
	sound: FunSounds
	index: number
	extraClasses?: {
		buttonClasses: string
		shadowColor: string
		iconClasses: string
		iconSize: string
	}
}

function SoundActionButton(props: SoundActionButtonProps): React.ReactNode {
	const { sound, index, extraClasses } = props
	const buttonRef = useRef<HTMLButtonElement>(null)
	const iconSize = extraClasses?.iconSize || "!size-10"

	// Map direction to the correct icon
	const getSoundIcon = (): React.ReactNode => {
		switch (sound) {
			case "Fart":
				return <CustomFart className={iconSize} />
			case "Monkey":
				if (getGarageClass().soundPlaying === "Monkey") {
					return <CustomHearNoEvilMonkey className={iconSize} />
				}
				return <CustomSpeakNoEvilMonkey className={iconSize} />
			case "Elephant":
				return <CustomElephant className={iconSize} />
			case "Party":
				return <CustomPartyPopper className={iconSize} />
			case "UFO":
				return <CustomUfo className={iconSize} />
			case "Countdown":
				return <CustomCountdown className={iconSize} />
			case "Robot":
				return <Bot className={iconSize} />
			case "Engine":
				return <CustomEngine className={iconSize} />
		}
	}

	// Update button styling directly when isPressed changes
	useEffect((): void => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (getGarageClass().soundPlaying === sound) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getGarageClass().soundPlaying, sound])

	// Handle button click for action buttons
	const handleButtonDown = (): void => {
		playFunSound(sound)
	}

	// Handle button release for action buttons
	const handleButtonUp = (): void => {
		// Reset the sound playing state when button is released
		if (getGarageClass().soundPlaying === sound) {
			getGarageClass().setSoundPlaying(null)
		}
	}

	return (
		<TactileButton
			ref={buttonRef}
			className={cn(
				"duration-150 w-20 h-20 flex items-center justify-center rounded-xl",
				"bg-sandboxOrange/20 text-sandboxOrange",
				"dark:bg-sandboxOrange/80 dark:text-orange-200",
				"outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
				extraClasses?.buttonClasses
			)}
			shadowColor={extraClasses?.shadowColor || "rgb(255 189 153)"}
			onMouseDown={handleButtonDown}
			onMouseUp={handleButtonUp}
			onMouseLeave={handleButtonUp}
			onTouchStart={handleButtonDown}
			onTouchEnd={handleButtonUp}
		>
			<span
				className={cn(
					"absolute top-1 left-1 w-5 h-5 flex items-center justify-center",
					"border-2 rounded-md text-xs font-medium border-sandboxOrange/40 dark:border-[rgb(255,189,153)]",
					"group-active:border-selectedSidebarButtonBorder group-active:text-answerText",
					extraClasses?.iconClasses
				)}
			>
				{index}
			</span>
			{getSoundIcon()}
		</TactileButton>
	)
}

export default observer(SoundActionButton)
