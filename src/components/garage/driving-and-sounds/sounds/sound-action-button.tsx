"use client"

import { observer } from "mobx-react"
import { ReactNode, useRef, useEffect } from "react"
import { cn } from "../../../../lib/shadcn/utils"
import { CustomElephant } from "../../../icons/custom-elephant"
import { usePipContext } from "../../../../contexts/pip-context"
import { TactileButton } from "../../../shadcn/ui/tactile-button"
import { useSocketContext } from "../../../../contexts/socket-context"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"
import { useGarageContext } from "../../../../contexts/garage-context"
import { CustomHearNoEvilMonkey } from "../../../icons/custom-hear-no-evil-monkey"
import { CustomSpeakNoEvilMonkey } from "../../../icons/custom-speak-no-evil-monkey"
import { CustomPartyPopper } from "../../../icons/custom-party-popper"
import { CustomMariachi } from "../../../icons/custom-mariachi"
import { CustomFart } from "../../../icons/custom-fart"
import { CustomCountdown } from "../../../icons/custom-countdown"
import { Bot } from "lucide-react"
import { CustomEngine } from "../../../icons/custom-engine"

function SoundActionButton({ sound, index } : { sound: Sounds, index: number }) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const defaultSiteTheme = useDefaultSiteTheme()
	const shadowColor = defaultSiteTheme === "light" ? "rgb(255 189 153)" : "rgb(37 99 235)"
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
		case "mariachi":
			return <CustomMariachi className="!size-10" />
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
			buttonElement.classList.add("bg-blue-300")
			buttonElement.classList.add("dark:bg-blue-950")
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
			buttonElement.classList.remove("bg-blue-300")
			buttonElement.classList.remove("dark:bg-blue-950")
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

	// Create a class string that prioritizes active state over hover
	const buttonClasses = cn(
		"w-20 h-20 flex items-center justify-center transition-none border-2 rounded-xl",
		"bg-sandboxOrange/20 border-sandboxOrange/40 text-sandboxOrange hover:bg-sandboxOrange/10",
		"dark:bg-sandboxOrange/80 dark:border-sandboxOrange/60 dark:text-sandboxOrange dark:hover:bg-sandboxOrange/900",
		"focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
		// Add active classes with !important to override hover
		garageClass.soundPlaying === sound && "!bg-sandboxOrange/5 dark:!bg-sandboxOrange/95"
	)

	return (
		<TactileButton
			ref={buttonRef}
			className={buttonClasses}
			shadowColor={shadowColor}
			shadowHeight={4}
			onMouseDown={handleButtonDown}
			onMouseUp={handleButtonUp}
			onMouseLeave={handleButtonUp}
			onTouchStart={handleButtonDown}
			onTouchEnd={handleButtonUp}
		>
			<span className={cn(
				"absolute top-1 left-1 w-5 h-5 flex items-center justify-center",
				"border-2 rounded-md text-xs font-medium border-sandboxOrange/40 dark:border-sandboxOrange/60",
				"group-active:border-selectedSidebarButtonBorder group-active:text-answerText dark:group-active:text-answerText"
			)}>
				{index}
			</span>
			{getSoundIcon()}
		</TactileButton>
	)
}

export default observer(SoundActionButton)
