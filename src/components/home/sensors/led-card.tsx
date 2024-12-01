import { cn } from "@/lib/shadcn/utils"
import { FaLightbulb } from "react-icons/fa"
import { useCallback, useState } from "react"

function getRandomRGBColor() {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	return `rgb(${r}, ${g}, ${b})`
}

export default function LEDCard() {
	const [ledColor, setLedColor] = useState<string | null>(null)

	const handleIconClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setLedColor(getRandomRGBColor())
	}, [])

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				"row-start-1 col-start-1"
			)}
		>
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6">
				<div className="pointer-events-auto w-fit" onClick={handleIconClick}> {/* w-fit to contain click area to icon */}
					<FaLightbulb
						className="h-12 w-12 origin-left transition-all duration-300 cursor-pointer"
						style={{
							color: ledColor || "currentColor",
							filter: ledColor ? `drop-shadow(0 0 8px ${ledColor})` : "none"
						}}
					/>
				</div>
				<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
					RGB LEDs
				</h3>
				<p className="max-w-lg text-neutral-400">
					Interactive RGB LEDs that can display any color.
				</p>
			</div>
		</div>
	)
}
