"use client"

import { observer } from "mobx-react"
import { useState, useCallback, useEffect } from "react" // Add useEffect
import { Save } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Button } from "../shadcn/ui/button"
import CharacterCounter from "../character-counter"
import editName from "../../utils/personal-info/edit-name"
import getPersonalInfoClass from "../../classes/personal-info-class"

function ChangeNameSection(): React.ReactNode {
	const [name, setName] = useState(getPersonalInfoClass().name || "")
	const [isNameChanged, setIsNameChanged] = useState(false)

	// ADD THIS: Sync local state when MobX observable changes
	useEffect((): void => {
		if (getPersonalInfoClass().name === null) return
		setName(getPersonalInfoClass().name || "")
		setIsNameChanged(false) // Reset changed state when data loads
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getPersonalInfoClass().name])

	// Name handling
	const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value)
		setIsNameChanged(e.target.value !== getPersonalInfoClass().name)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getPersonalInfoClass().name])

	const saveName = useCallback(async (): Promise<void> => {
		await editName(name)
		setIsNameChanged(false)
	}, [name])

	return (
		<div className="mb-6">
			<Label htmlFor="name" className="text-base md:text-lg font-medium text-eel mb-2 block">
				Name
			</Label>
			<div className="flex flex-col sm:flex-row sm:items-center gap-2">
				<div className="relative w-full max-w-xl">
					<Input
						id="name"
						value={name}
						onChange={handleNameChange}
						className="w-full pr-14 h-10 md:h-12 text-lg md:!text-xl
								bg-polar !text-eel font-light border-swan shadow-none"
						maxLength={50}
					/>
					<CharacterCounter
						value={name}
						characterLimit={50}
						extraClasses="right-3"
					/>
				</div>
				{isNameChanged && (
					<Button
						onClick={saveName}
						size="default"
						variant="ghost"
						className="self-end sm:self-auto sm:ml-2 hover:bg-polar p-2"
					>
						<Save className="h-5 w-5 md:!h-6 md:!w-6" />
					</Button>
				)}
			</div>
		</div>
	)
}

export default observer(ChangeNameSection)
