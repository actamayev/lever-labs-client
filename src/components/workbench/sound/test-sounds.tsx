/* eslint-disable max-len */
"use client"

import { Dispatch, SetStateAction } from "react"
import { observer } from "mobx-react"
import toUpper from "lodash-es/toUpper"
import { TuneToPlay } from "@bluedotrobots/common-ts"
import { ChevronDown } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import playTune from "../../../utils/workbench/play-tune"
import workbenchClass from "../../../classes/workbench-class"
import { Button, buttonVariants } from "../../shadcn/ui/button"

interface Props {
	isDropdownOpen: boolean
	setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
}

function TestSounds(props: Props) {
	const { isDropdownOpen, setIsDropdownOpen } = props
	const testSounds: TuneToPlay[] = ["Breeze", "Chime", "Chirp", "Pop", "Splash"]

	return (
		<div className="space-y-3">
			<div className="text-sm font-medium text-eel/70">Test Sounds</div>
			<div className="flex items-center gap-2">
				<Button
					disabled={workbenchClass.isMuted}
					className="rounded-xl bg-eel flex-1"
					onClick={playTune}
				>
					PLAY A TUNE
				</Button>
				<div className="w-24 cursor-pointer">
					<DropdownMenu
						open={isDropdownOpen}
						onOpenChange={setIsDropdownOpen}
					>
						<DropdownMenuTrigger asChild>
							<div
								className={cn(
									buttonVariants({
										variant: "outline",
										className: "flex items-center gap-1 rounded-xl justify-between w-full h-9 px-2"
									}),
									workbenchClass.isMuted && "opacity-50 pointer-events-none"
								)}
							>
								<span className="text-xs font-medium">
									{toUpper(workbenchClass.selectedSound)}
								</span>
								<ChevronDown className="h-3 w-3" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="rounded-xl bg-standardBackground border-swan"
							align="end"
						>
							{testSounds.map((sound) => (
								<DropdownMenuItem
									key={sound}
									onClick={() => {
										workbenchClass.setSelectedSound(sound)
										setIsDropdownOpen(false)
									}}
									className="cursor-pointer transition-none hover:!bg-polar rounded-lg"
								>
									<span className="text-sm font-medium">
										{toUpper(sound)}
									</span>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	)
}

export default observer(TestSounds)
