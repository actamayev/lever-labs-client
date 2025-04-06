"use client"

import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import { Save, Moon, Sun, LogOut } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Button } from "../shadcn/ui/button"
import ProfileLayout from "./profile-layout"
import useLogout from "../../hooks/auth/logout"
import CharacterCounter from "../character-counter"
import ProfileImage from "./profile-image/profile-image"
import useEditName from "../../hooks/personal-info/edit-name"
import useEditUsername from "../../hooks/personal-info/edit-username"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import useChangePassword from "../../hooks/personal-info/change-password"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import useSetDefaultSiteTheme from "../../hooks/personal-info/set-default-site-theme"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn/ui/card"

// eslint-disable-next-line complexity, max-lines-per-function
function ProfilePage() {
	const personalInfoClass = usePersonalInfoContext()
	const [name, setName] = useState(personalInfoClass.name || "")
	const [username, setUsername] = useState(personalInfoClass.username || "")
	const [isNameChanged, setIsNameChanged] = useState(false)
	const [isUsernameChanged, setIsUsernameChanged] = useState(false)
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const updateName = useEditName()
	const updateUsername = useEditUsername()
	const updatePassword = useChangePassword()
	const logout = useLogout()
	const defaultSiteTheme = useDefaultSiteTheme()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	// Name handling
	const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
		setIsNameChanged(e.target.value !== personalInfoClass.name)
	}, [personalInfoClass.name])

	const saveName = useCallback(async () => {
		await updateName(name)
		setIsNameChanged(false)
	}, [name, updateName])

	// Username handling
	const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
		setIsUsernameChanged(e.target.value !== personalInfoClass.username)
	}, [personalInfoClass.username])

	const saveUsername = useCallback(async () => {
		await updateUsername(username)
		setIsUsernameChanged(false)
	}, [updateUsername, username])

	// Password handling
	const handleCurrentPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPassword(e.target.value)
	}, [])

	const handleNewPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value)
	}, [])

	const savePassword = useCallback(async () => {
		// Implement save functionality for password
		await updatePassword(currentPassword, newPassword)
		setCurrentPassword("")
		setNewPassword("")
	}, [currentPassword, newPassword, updatePassword])

	// Check if password change is valid
	const isPasswordChangeValid = currentPassword.length >= 6 &&
		newPassword.length >= 6 &&
		currentPassword !== newPassword

	return (
		<ProfileLayout>
			<div className="px-8 sm:px-8 md:px-16 lg:px-32 mt-5">
				<div className="font-medium text-3xl text-questionText mb-10">
					Profile
				</div>

				{/* Profile Picture and Email Section */}
				<div className="flex flex-col md:flex-row gap-8 mb-8">
					<ProfileImage />
				</div>

				<div className="mb-6">
					<div className="text-lg font-medium text-eel mb-2 block">
						Email
					</div>
					<div className="text-lg font-medium text-wolf">
						{personalInfoClass.email || "No email set"}
					</div>
				</div>

				{/* Name Section */}
				<div className="mb-6">
					<Label htmlFor="name" className="text-lg font-medium text-eel mb-2 block">
						Name
					</Label>
					<div className="flex items-center">
						<div className="relative w-full max-w-md">
							<Input
								id="name"
								value={name}
								onChange={handleNameChange}
								className="w-full pr-14 h-12 !text-xl bg-polar !text-eel font-light"
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
								size="icon"
								variant="ghost"
								className="ml-2"
							>
								<Save className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>

				{/* Username Section */}
				<div className="mb-6">
					<Label htmlFor="username" className="text-lg font-medium text-eel mb-2 block">
							Username
					</Label>
					<div className="flex items-center">
						<div className="relative w-full max-w-md">
							<Input
								id="username"
								value={username}
								onChange={handleUsernameChange}
								className="w-full pr-14 h-12 !text-xl bg-polar !text-eel font-light"
								maxLength={50}
							/>
							<CharacterCounter
								value={username}
								characterLimit={50}
								extraClasses="right-3"
							/>
						</div>
						{isUsernameChanged && (
							<Button
								onClick={saveUsername}
								size="icon"
								variant="ghost"
								className="ml-2"
							>
								<Save className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>

				{/* Password Change Section */}
				<Card className="mb-8 max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl">Change Password</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="current-password" className="text-lg font-medium text-eel mb-2 block">
									Current Password
							</Label>
							<Input
								id="current-password"
								type="password"
								value={currentPassword}
								onChange={handleCurrentPasswordChange}
								className="w-full pr-14 h-12 !text-xl bg-polar !text-eel font-light"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="new-password" className="text-lg font-medium text-eel mb-2 block">
									New Password
							</Label>
							<Input
								id="new-password"
								type="password"
								value={newPassword}
								onChange={handleNewPasswordChange}
								className="w-full pr-14 h-12 !text-xl bg-polar !text-eel font-light"
							/>
							{newPassword.length > 0 && newPassword.length < 6 && (
								<p className="text-sm text-red-500">
										Password must be at least 6 characters.
								</p>
							)}
						</div>
					</CardContent>
					<CardFooter>
						<Button
							onClick={savePassword}
							disabled={!isPasswordChangeValid}
						>
							Save Changes
						</Button>
					</CardFooter>
				</Card>

				{/* Theme Toggle */}
				<div className="mb-8">
					<Button
						variant="outline"
						size="icon"
						onClick={setDefaultSiteTheme}
						className="rounded-full h-10 w-10"
					>
						{defaultSiteTheme === "light" ? (
							<Moon className="h-5 w-5" />
						) : (
							<Sun className="h-5 w-5" />
						)}
					</Button>
					<span className="ml-3 text-sm font-medium">
						{defaultSiteTheme === "light" ? "Dark Mode" : "Light Mode"}
					</span>
				</div>

				{/* Logout Button - only shown on mobile */}
				<div className="md:hidden">
					<Button
						variant="destructive"
						onClick={logout}
						className="flex items-center"
					>
						<LogOut className="mr-2 h-4 w-4" />
							Logout
					</Button>
				</div>
			</div>
		</ProfileLayout>
	)
}

export default observer(ProfilePage)
