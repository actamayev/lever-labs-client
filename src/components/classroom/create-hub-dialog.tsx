"use client"

import { ClassCode, CareerUUID } from "@lever-labs/common-ts/types/utils"
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "../ui/dialog"
import { Input } from "../ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../buttons/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { careerData, meetPipData } from "../../utils/constants/career-quest/career-data"
import { CAREER_DEFINITIONS } from "../../utils/career-quest/career-quest-right-content/all-career-quest-right-content"
import createHub from "../../utils/teacher/hub/create-hub"

interface Props {
	classCode: ClassCode
	isCreateHubDialogOpen: boolean
	setIsCreateHubDialogOpen: Dispatch<SetStateAction<boolean>>
}

interface CareerOption {
	careerUUID: CareerUUID
	careerName: string
	careerIcon: React.ComponentType<{ className?: string }>
	backgroundColor: string
}

// eslint-disable-next-line max-lines-per-function
export default function CreateHubDialog(props: Props): React.ReactNode {
	const { classCode, isCreateHubDialogOpen, setIsCreateHubDialogOpen } = props
	const [hubName, setHubName] = useState("")
	const [selectedCareer, setSelectedCareer] = useState<CareerOption | null>(null)
	const [error, setError] = useState("")
	const [isCreating, setIsCreating] = useState(false)
	const colors = getDuolingoColors("humpback")

	// Combine meet pip data with career data
	const allCareers: CareerOption[] = useMemo((): CareerOption[] => [
		{
			careerUUID: meetPipData.careerUUID,
			careerName: meetPipData.careerName,
			careerIcon: meetPipData.careerIcon,
			backgroundColor: meetPipData.backgroundColor
		},
		...careerData.map((career): CareerOption => ({
			careerUUID: career.careerUUID,
			careerName: career.careerName,
			careerIcon: career.careerIcon,
			backgroundColor: career.backgroundColor
		}))
	], [])

	const handleCancelCreate = useCallback((): void => {
		setIsCreateHubDialogOpen(false)
		setHubName("")
		setSelectedCareer(null)
		setError("")
	}, [setIsCreateHubDialogOpen])

	const getFirstSlideId = useCallback((careerUUID: CareerUUID): string => {
		const careerDefinition = CAREER_DEFINITIONS[careerUUID]
		if (!careerDefinition || !careerDefinition.sections.length) {
			return ""
		}

		const firstSection = careerDefinition.sections[0]
		if (firstSection.type === "textParent" && firstSection.children.length > 0) {
			return firstSection.children[0].id
		}

		return firstSection.id
	}, [])

	const handleCreateHub = useCallback(async (): Promise<void> => {
		if (!hubName.trim()) {
			setError("Hub name is required")
			return
		}

		if (!selectedCareer) {
			setError("Career selection is required")
			return
		}

		setIsCreating(true)
		setError("")

		try {
			const slideId = getFirstSlideId(selectedCareer.careerUUID)
			await createHub(classCode, hubName, selectedCareer.careerUUID, slideId)

			// Success - dialog will be closed by navigation in createHub
			setIsCreateHubDialogOpen(false)
			setHubName("")
			setSelectedCareer(null)
		} catch (err) {
			console.error("Error creating hub:", err)
			setError("Failed to create hub. Please try again.")
		}

		setIsCreating(false)
	}, [classCode, hubName, selectedCareer, setIsCreateHubDialogOpen, getFirstSlideId])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key === "Escape") {
			handleCancelCreate()
		} else if (e.key === "Enter" && !isCreating && hubName.trim() && selectedCareer) {
			void handleCreateHub()
		}
	}, [handleCancelCreate, handleCreateHub, isCreating, hubName, selectedCareer])

	const handleCareerSelect = useCallback((careerUUID: CareerUUID): void => {
		const career = allCareers.find((c): boolean => c.careerUUID === careerUUID)
		setSelectedCareer(career || null)
	}, [allCareers])

	const isFormValid = hubName.trim() && selectedCareer

	return (
		<Dialog open={isCreateHubDialogOpen} onOpenChange={setIsCreateHubDialogOpen}>
			<DialogContent className="w-full max-w-md min-w-80 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Create Hub</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<label htmlFor="hubName" className="block text-sm font-medium text-wolf mb-2">
							Hub Name
						</label>
						<Input
							id="hubName"
							value={hubName}
							onChange={(e): void => setHubName(e.target.value)}
							placeholder="Enter hub name"
							className="w-full text-xl! h-10"
							onKeyDown={handleKeyDown}
							autoFocus
							maxLength={50}
							disabled={isCreating}
						/>
					</div>

					<div>
						<label htmlFor="career" className="block text-sm font-medium text-wolf mb-2">
							Career
						</label>
						<Select
							value={selectedCareer?.careerUUID || ""}
							onValueChange={handleCareerSelect}
							disabled={isCreating}
						>
							<SelectTrigger
								className="w-full h-auto min-h-10 text-lg border-2 border-swan rounded-xl shadow-none whitespace-normal"
							>
								<SelectValue placeholder="Select a career" className="whitespace-normal wrap-break-word" />
							</SelectTrigger>
							<SelectContent>
								{allCareers.map((career): React.ReactNode => {
									const Icon = career.careerIcon
									return (
										<SelectItem key={career.careerUUID} value={career.careerUUID} className="cursor-pointer">
											<div className="flex items-center gap-2 min-w-0">
												<Icon className="h-4 w-4 shrink-0" />
												<span className="truncate">{career.careerName}</span>
											</div>
										</SelectItem>
									)
								})}
							</SelectContent>
						</Select>
					</div>

					{error && <p className="text-cardinal text-sm">{error}</p>}
				</div>
				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={handleCancelCreate}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
						disabled={isCreating}
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleCreateHub}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
						disabled={isCreating || !isFormValid}
					>
						{isCreating ? "CREATING..." : "CREATE HUB"}
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
