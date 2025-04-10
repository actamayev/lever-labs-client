"use client"

import { observer } from "mobx-react"
import { ReactNode, useRef, useEffect } from "react"
import { cn } from "../../../../lib/shadcn/utils"
import { usePipContext } from "../../../../contexts/pip-context"
import { TactileButton } from "../../../shadcn/ui/tactile-button"
import { CustomHeadlights } from "../../../icons/custom-headlights"
import { useSocketContext } from "../../../../contexts/socket-context"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"
import { useGarageContext } from "../../../../contexts/garage-context"
import { CustomHearNoEvilMonkey } from "../../../icons/custom-hear-no-evil-monkey"
import { CustomSpeakNoEvilMonkey } from "../../../icons/custom-speak-no-evil-monkey"
import { CustomElephant } from "../../../icons/custom-elephant"

function SoundActionButton({ sound } : { sound: Sounds }) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const defaultSiteTheme = useDefaultSiteTheme()
	const shadowColor = defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"
	const socketClass = useSocketContext()
	const pipClass = usePipContext()
	const garageClass = useGarageContext()

	// Map direction to the correct icon
	const getSoundIcon = (): ReactNode => {
		switch (sound) {
		case "fart":
			return <CustomHeadlights className="!size-12" />
		case "monkey":
			if (garageClass.soundPlaying === "monkey") {
				return <CustomHearNoEvilMonkey className="!size-12" />
			}
			return <CustomSpeakNoEvilMonkey className="!size-12" />
		case "elephant":
			return <CustomElephant className="!size-12" />
		case "fanfare":
			return <CustomHeadlights className="!size-12" />
		case "mariachi":
			return <CustomHeadlights className="!size-12" />
		case "countdown":
			return <CustomHeadlights className="!size-12" />
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
		socketClass.emitSound({
			pipUUID: pipClass.selectedPip.pipUUID,
			sound
		})
	}

	// Create button styles with proper tactile behavior
	const getButtonClasses = () => cn(
		"w-20 h-20 flex items-center justify-center transition-none border-2 rounded-xl",
		"bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-50",
		"dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-950",
		"focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
	)

	return (
		<TactileButton
			ref={buttonRef}
			className={getButtonClasses()}
			shadowColor={shadowColor}
			shadowHeight={4}
			onMouseDown={handleButtonDown}
			onTouchStart={handleButtonDown}
		>
			{getSoundIcon()}
		</TactileButton>
	)
}

export default observer(SoundActionButton)
