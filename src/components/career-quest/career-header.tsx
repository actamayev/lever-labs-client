"use client"

import { X } from "lucide-react"
import { Button } from "../shadcn/ui/button"
import CareerProgressBar from "./career-progress-bar"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

export default function CareerQuestActivityHeader() {
	const typedNavigate = useTypedNavigate()

	return (
		<header className="h-20 flex items-center px-4 shadow-md fixed top-0 left-0 right-0 bg-standardBackground z-10">
			{/* Left section with X button */}
			<div className="w-1/4 flex items-center">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => typedNavigate("/career-quest")}
					className="!p-6 hover:bg-polar"
				>
					<X className="!h-6 !w-6" />
				</Button>
			</div>

			{/* Center section with progress bar - taking up 50% width */}
			<div className="w-1/2 flex justify-center">
				<CareerProgressBar />
			</div>

			{/* Empty right section for balance */}
			<div className="w-1/4"></div>
		</header>
	)
}
