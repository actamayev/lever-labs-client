"use client"

import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import { Save, Moon, Sun } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Button } from "../shadcn/ui/button"
import ProfileLayout from "./profile-layout"
import CharacterCounter from "../character-counter"
import ProfileImage from "./profile-image/profile-image"
import useEditName from "../../hooks/personal-info/edit-name"
import useEditUsername from "../../hooks/personal-info/edit-username"
import personalInfoClass from "../../classes/personal-info-class"
import useSetDefaultSiteTheme from "../../hooks/personal-info/set-default-site-theme"
import { cn } from "../../lib/shadcn/utils"
import ChangePasswordSection from "./change-password-section"

// eslint-disable-next-line max-lines-per-function, complexity
function ProfilePage() {
	const [name, setName] = useState(personalInfoClass.name || "")
	const [username, setUsername] = useState(personalInfoClass.username || "")
	const [isNameChanged, setIsNameChanged] = useState(false)
	const [isUsernameChanged, setIsUsernameChanged] = useState(false)
	const updateName = useEditName()
	const updateUsername = useEditUsername()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()
	const [usernameError, setUsernameError] = useState("")

	// Name handling
	const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
		setIsNameChanged(e.target.value !== personalInfoClass.name)
	}, [])

	const saveName = useCallback(async () => {
		await updateName(name)
		setIsNameChanged(false)
	}, [name, updateName])

	const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const newUsername = e.target.value
		setUsername(newUsername)
		setIsUsernameChanged(newUsername !== personalInfoClass.username)

		// Clear error message when user starts typing
		if (usernameError) {
			setUsernameError("")
		}
	}, [usernameError])

	const saveUsername = useCallback(async () => {
		const errorMessage = await updateUsername(username)
		if (errorMessage) {
			setUsernameError(errorMessage)
			setIsUsernameChanged(true) // Keep the save button visible
		} else {
			setUsernameError("")
			setIsUsernameChanged(false)
		}
	}, [updateUsername, username])

	return (
		<ProfileLayout>
			<div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mt-5 max-w-full">
				<div className="font-medium text-2xl md:text-3xl text-questionText mb-6 md:mb-10">
					Profile
				</div>

				{/* Profile Picture and Email Section */}
				<div className="flex flex-col gap-6 mb-8">
					<ProfileImage />
				</div>

				<div className="mb-6">
					<div className="text-base md:text-lg font-medium text-eel mb-2 block">
						Email
					</div>
					<div className="text-base md:text-lg font-medium text-wolf break-words">
						{personalInfoClass.email || "No email set"}
					</div>
				</div>

				{/* Name Section */}
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

				{/* Username Section */}
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
									"w-full pr-14 h-10 md:h-12 text-lg md:!text-xl bg-polar !text-eel font-light shadow-none border-swan",
									(username.length > 0 && username.length < 3) && "border-cardinal focus-visible:!border-cardinal"
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
								<Save className="h-5 w-5 md:!h-6 md:!w-6" />
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

				<ChangePasswordSection />

				{/* Theme Toggle */}
				<div className="mb-8 flex items-center">
					<Button
						variant="outline"
						size="icon"
						onClick={setDefaultSiteTheme}
						className="rounded-full h-9 w-9 md:h-10 md:w-10"
					>
						{personalInfoClass.defaultSiteTheme === "light" ? (
							<Moon className="h-5 w-5 md:!h-6 md:!w-6" />
						) : (
							<Sun className="h-5 w-5 md:!h-6 md:!w-6" />
						)}
					</Button>
					<span
						className="ml-3 text-base md:text-lg font-medium cursor-pointer"
						onClick={setDefaultSiteTheme}
					>
						{personalInfoClass.defaultSiteTheme === "light" ? "Dark Mode" : "Light Mode"}
					</span>
				</div>
			</div>
		</ProfileLayout>
	)
}

export default observer(ProfilePage)
