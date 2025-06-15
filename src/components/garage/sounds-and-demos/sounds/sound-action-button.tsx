"use client"

import { Bot } from "lucide-react"
import { observer } from "mobx-react"
import { ReactNode, useRef, useEffect } from "react"
import { cn } from "../../../../lib/shadcn/utils"
import { CustomFart } from "../../../icons/custom-fart"
import { CustomEngine } from "../../../icons/custom-engine"
import { CustomUfo } from "../../../icons/custom-ufo"
import { CustomElephant } from "../../../icons/custom-elephant"
import { usePipContext } from "../../../../classes/pip-context"
import { TactileButton } from "../../../shadcn/ui/tactile-button"
import { CustomCountdown } from "../../../icons/custom-countdown"
import { useSocketContext } from "../../../../classes/socket-context"
import { CustomPartyPopper } from "../../../icons/custom-party-popper"
import { useGarageContext } from "../../../../classes/garage-context"
import { CustomHearNoEvilMonkey } from "../../../icons/custom-hear-no-evil-monkey"
import { CustomSpeakNoEvilMonkey } from "../../../icons/custom-speak-no-evil-monkey"
import { Sounds } from "@bluedotrobots/common-ts"

function SoundActionButton({ sound, index } : { sound: Sounds, index: number }) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const socketClass = useSocketContext()
	const pipClass = usePipContext()
	const garageClass = useGarageContext()

	// Map direction to the correct icon
	const getSoundIcon = (): ReactNode => {
		switch (sound) {
		case "fart":
			return <CustomFart className="!size-10" />
		case "monkey":
			if (garageClass.soundPlaying === "monkey") {
				return <CustomHearNoEvilMonkey className="!size-10" />
			}
			return <CustomSpeakNoEvilMonkey className="!size-10" />
		case "elephant":
			return <CustomElephant className="!size-10" />
		case "fanfare":
			return <CustomPartyPopper className="!size-10" />
		case "ufo":
			return <CustomUfo className="!size-10" />
		case "countdown":
			return <CustomCountdown className="!size-10" />
		case "robot noise":
			return <Bot className="!size-10" />
		case "engine":
			return <CustomEngine className="!size-10" />
		}
	}

	// Update button styling directly when isPressed changes
	useEffect(() => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (garageClass.soundPlaying === sound) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
		}
	}, [garageClass.soundPlaying, sound])

	// Handle button click for action buttons
	const handleButtonDown = () => {
		if (!pipClass.selectedPip) return
		garageClass.setSoundPlaying(sound)
		socketClass.emitSound({
			pipUUID: pipClass.selectedPip.pipUUID,
			sound
		})
	}

	// Handle button release for action buttons
	const handleButtonUp = () => {
		// Reset the sound playing state when button is released
		if (garageClass.soundPlaying === sound) {
			garageClass.setSoundPlaying(null)
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
			)}
			shadowColor={"rgb(255 189 153)"}
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
				)}
			>
				{index}
			</span>
			{getSoundIcon()}
		</TactileButton>
	)
}

export default observer(SoundActionButton)
