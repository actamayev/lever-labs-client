"use client"

import { Save } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import CharacterCounter from "../character-counter"
import personalInfoClass from "../../classes/personal-info-class"
import editUsername from "../../utils/personal-info/edit-username"

function ChangeUsernameSection(): React.ReactNode {
	const [username, setUsername] = useState(personalInfoClass.username || "")
	const [isUsernameChanged, setIsUsernameChanged] = useState(false)
	const [usernameError, setUsernameError] = useState("")

	const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const newUsername = e.target.value
		setUsername(newUsername)
		setIsUsernameChanged(newUsername !== personalInfoClass.username)

		// Clear error message when user starts typing
		if (usernameError) {
			setUsernameError("")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usernameError, personalInfoClass.username])

	const saveUsername = useCallback(async (): Promise<void> => {
		const errorMessage = await editUsername(username)
		if (errorMessage) {
			setUsernameError(errorMessage)
			setIsUsernameChanged(true) // Keep the save button visible
		} else {
			setUsernameError("")
			setIsUsernameChanged(false)
		}
	}, [username])

	return (
		<div className="mb-6">
			<Label htmlFor="username" className="text-base md:text-lg font-medium text-eel mb-2 block">
				Username
			</Label>
			<div className="flex flex-col sm:flex-row sm:items-center gap-2">
				<div className="relative w-full max-w-xl">
					<Input
						id="username"
						value={username}
						onChange={handleUsernameChange}
						className={cn(
							"w-full pr-14 h-10 md:h-12 text-lg md:text-xl! bg-polar text-eel! font-light shadow-none border-swan",
							(username.length > 0 && username.length < 3) && "border-cardinal focus-visible:border-cardinal!"
						)}
						maxLength={50}
					/>
					<CharacterCounter
						value={username}
						characterLimit={50}
						extraClasses="right-3"
					/>
				</div>
				{isUsernameChanged && username.length >= 3 && (
					<Button
						onClick={saveUsername}
						size="default"
						variant="ghost"
						className="self-end sm:self-auto sm:ml-2 hover:bg-polar p-2"
					>
						<Save className="h-5 w-5 md:h-6! md:w-6!" />
					</Button>
				)}
			</div>
			{username.length > 0 && (
				username.length < 3 ? (
					<p className="text-sm text-cardinal mt-1">
						Username must be at least 3 characters.
					</p>
				) : (
					<p className="text-sm text-cardinal mt-1">
						{usernameError}
					</p>
				)
			)}
		</div>
	)
}

export default observer(ChangeUsernameSection)
